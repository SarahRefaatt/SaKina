
import { supabase } from "@/lib/supabaseClient";
import cookie from "cookie";


export async function GET(req: Request) {

  // Parse cookies to get sessionid
  const rawCookies = cookie.parse(req.headers.get("cookie") || "");
  const sessionId = rawCookies.sessionid;

  // Get customer_id from query
  const { searchParams } = new URL(req.url);
  const customer_id = searchParams.get("customer_id");

  let cart;

  if (customer_id) {
    // Fetch cart by customer
    const { data, error } = await supabase
      .from("cloth_carts")
      .select("*")
      .eq("customer_id", customer_id)
      .single();
    if (error) return Response.json({ error: error.message }, { status: 500 });
    cart = data;
  } else if (sessionId) {
    // Fetch cart by session
    const { data, error } = await supabase
      .from("cloth_carts")
      .select("*")
      .eq("sessionid", sessionId)
      .single();
    if (error) return Response.json({ error: error.message }, { status: 500 });
    cart = data;
  } else {
    return Response.json({ error: "No cart found" }, { status: 404 });
  }

  // Get cart items with product details
  const { data: cartItems, error: cartItemsError } = await supabase
    .from("cloth_cart_items")
    .select(`
      id,
      cart_id,
      quantity,
      product:cloth_products (
        id,
        name,
        price,
        description,
        stock_quantity,
        sku,
        category,
        image_urls
      )
    `)
    .eq("cart_id", cart.id);

  if (cartItemsError)
    return Response.json({ error: cartItemsError.message }, { status: 500 });

  return Response.json({ cart, cartItems });
}




function generateSessionId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function POST(req: Request) {
  const { customer_id } = await req.json();

  // Parse cookies
  const rawCookies = cookie.parse(req.headers.get("cookie") || "");
  let sessionId = rawCookies.sessionid;

  // ✅ If customer_id provided → check if exists
  if (customer_id) {
    const { data: customer, error: customerError } = await supabase
      .from("cloth_customers")
      .select("*")
      .eq("id", customer_id)
      .single();

    if (customerError)
      return new Response(
        JSON.stringify({ error: customerError.message }),
        { status: 500 }
      );
    if (!customer)
      return new Response(
        JSON.stringify({ error: "Customer not found" }),
        { status: 404 }
      );

    // 🔍 Try to get existing cart for this customer
    const { data: existingCart } = await supabase
      .from("cloth_carts")
      .select("*")
      .eq("customer_id", customer_id)
      .maybeSingle();

    if (existingCart) {
      return new Response(JSON.stringify(existingCart), { status: 200 });
    }

    // 🆕 Create new cart for logged-in customer
    const { data: newCart, error: createError } = await supabase
      .from("cloth_carts")
      .insert({ customer_id })
      .select()
      .single();

    if (createError)
      return new Response(JSON.stringify({ error: createError.message }), {
        status: 500,
      });

    return new Response(JSON.stringify(newCart), { status: 201 });
  }

  // 🔹 GUEST FLOW
  // If no customer_id, use sessionid
  if (!sessionId) sessionId = generateSessionId();

  // Try to find existing guest cart
  const { data: guestCart } = await supabase
    .from("cloth_carts")
    .select("*")
    .eq("sessionid", sessionId)
    .maybeSingle();

  if (guestCart) {
    return new Response(JSON.stringify(guestCart), {
      status: 200,
      headers: {
        "Set-Cookie": cookie.serialize("sessionid", sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 24 * 30, // 30 days
        }),
      },
    });
  }

  // Create a guest cart
  const { data: newGuestCart, error: guestError } = await supabase
    .from("cloth_carts")
    .insert({ sessionid: sessionId })
    .select()
    .single();

  if (guestError)
    return new Response(JSON.stringify({ error: guestError.message }), {
      status: 500,
    });

  return new Response(JSON.stringify(newGuestCart), {
    status: 201,
    headers: {
      "Set-Cookie": cookie.serialize("sessionid", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      }),
    },
  });
}



export async function PUT(req: Request) {
  try {
    const { items } = await req.json();

    // ✅ Validate request body
    if (!Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Items array is required" }),
        { status: 400 }
      );
    }

    // Ensure each item has valid data
    for (const item of items) {
      if (!item.cart_item_id || typeof item.quantity !== "number" || item.quantity < 1) {
        return new Response(
          JSON.stringify({
            error: "Each item must have a valid cart_item_id and quantity >= 1",
          }),
          { status: 400 }
        );
      }
    }

    // 🔄 Perform bulk update
    const updates = items.map(({ cart_item_id, quantity }) => ({
      id: cart_item_id,
      quantity,
    }));

    const { data, error } = await supabase
      .from("cloth_cart_items")
      .upsert(updates, { onConflict: "id" }) // updates based on `id`
      .select();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ updatedItems: data }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err || "Something went wrong" }),
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request) {
  try {
    const { cartId } = await req.json();

    // ✅ Validate request body
    if (!cartId) {
      return new Response(
        JSON.stringify({ error: "cartId is required" }),
        { status: 400 }
      );
    }

    // 🔥 Delete all items with this cart_id
    const { error } = await supabase
      .from("cloth_cart_items")
      .delete()
      .eq("cart_id", cartId);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ message: `All items from cart ${cartId} deleted successfully` }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err || "Something went wrong" }),
      { status: 500 }
    );
  }
}
