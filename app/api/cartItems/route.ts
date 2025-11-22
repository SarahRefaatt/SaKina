
import { supabase } from "@/lib/supabaseClient";

// GET Cart Items
export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const cart_id = url.searchParams.get("cartId");
  const product_id = url.searchParams.get("product_id");

  if (id) {
    const { data, error } = await supabase.from("cloth_cart_items").select("*").eq("id", Number(id)).single();
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  }

  if (cart_id) {
    const { data, error } = await supabase.from("cloth_cart_items").select("*").eq("cart_id", Number(cart_id));
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  }

  if (product_id) {
    const { data, error } = await supabase.from("cloth_cart_items").select("*").eq("product_id", Number(product_id));
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  }

  const { data, error } = await supabase.from("cloth_cart_items").select("*");
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  return new Response(JSON.stringify(data), { status: 200 });
}

// POST Add Item to Cart
export async function POST(req: Request) {
  const { cart_id, product_id, quantity } = await req.json();
  if (!cart_id || !product_id || !quantity) return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });

  // Validate product exists
  const { data: product, error: productError } = await supabase.from("cloth_products").select("id, stock_quantity").eq("id", product_id).single();
  if (productError || !product) return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });

  // Validate stock
  if (quantity > product.stock_quantity) return new Response(JSON.stringify({ error: "Not enough stock available" }), { status: 400 });

  // Validate cart exists
  const { data: cart, error: cartError } = await supabase.from("cloth_carts").select("id").eq("id", cart_id).single();
  if (cartError || !cart) return new Response(JSON.stringify({ error: "Cart not found" }), { status: 404 });

  // Check if item already in cart
  const { data: existingItem, error: existingError } = await supabase
    .from("cloth_cart_items")
    .select("id, quantity")
    .eq("cart_id", cart_id)
    .eq("product_id", product_id)
    .maybeSingle(); // ✅ use maybeSingle() instead of single().catch()

  if (existingError) {
    return new Response(JSON.stringify({ error: existingError.message }), { status: 500 });
  }  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    if (newQuantity > product.stock_quantity) return new Response(JSON.stringify({ error: "Cannot exceed product stock" }), { status: 400 });
    const { data, error } = await supabase.from("cloth_cart_items").update({ quantity: newQuantity }).eq("id", existingItem.id).select().single();
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  }

  // Insert new item
  const { data, error } = await supabase.from("cloth_cart_items").insert([{ cart_id, product_id, quantity }]).select().single();
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 201 });
}

// PUT Update Cart Item
export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });

  const { cart_id, product_id, quantity } = await req.json();

  // Validate product
  const { data: product, error: productError } = await supabase.from("cloth_products").select("id, stock_quantity").eq("id", product_id).single();
  if (productError || !product) return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });

  // Validate cart
  const { data: cart, error: cartError } = await supabase.from("cloth_carts").select("id").eq("id", cart_id).single();
  if (cartError || !cart) return new Response(JSON.stringify({ error: "Cart not found" }), { status: 404 });

  // Validate stock
  if (quantity > product.stock_quantity) return new Response(JSON.stringify({ error: "Not enough stock available" }), { status: 400 });

  // Update item
  const { data, error } = await supabase.from("cloth_cart_items").update({ cart_id, product_id, quantity }).eq("id", id).select().single();
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  return new Response(JSON.stringify(data), { status: 200 });
}


export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });

  const { data, error } = await supabase.from("cloth_cart_items").delete().eq("id", id).select().single();
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
}