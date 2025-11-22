
import { supabase } from "@/lib/supabaseClient";

const STATUS_ENUM = ["pending", "paid", "shipped", "delivered", "cancelled"];
const PAYMENT_METHOD_ENUM = ["cash_on_delivery", "Instapay"];
const PAYMENT_STATUS_ENUM = ["unpaid", "paid", "refunded"];

// GET cloth_orders
export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const customer_email = url.searchParams.get("customer_email");
  const status=url.searchParams.get("status")

  // ✅ Get order by ID with items
  if (id && !isNaN(Number(id))) {
    const { data, error } = await supabase
      .from("cloth_orders")
      .select(`
        *,
        order_items (
          id,
          product_id,
          quantity,
          price,
          total,
          product:products (
            id,
            name,
            price,
            description,
            stock_quantity,
            sku,
            category,
            image_urls
          )
        )
      `)
      .eq("id", Number(id))
      .single();

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  }

  // ✅ Get cloth_orders by customer email
  if (customer_email) {
    const { data, error } = await supabase
      .from("cloth_orders")
      .select("*")
      .eq("customer_email", customer_email);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  }

if (status) {
  const { count, error } = await supabase
    .from("cloth_orders")
    .select("*", { count: "exact", head: true })
    .eq("status", status);

  if (error) {
    console.error("Error fetching count:", error);
  } else {
    console.log("Order count:", count);
  }
}


  // ✅ Get all cloth_orders
  const { data, error } = await supabase
    .from("cloth_orders")
    .select("*");

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  return new Response(JSON.stringify(data), { status: 200 });
}


// // POST Order
// export async function POST(req: Request) {
//   const {
//     customer_id,
//     customer_name,
//     customer_email,
//     customer_phone,
//     cart_id,
//     status = "pending",
//     payment_method,
//     payment_status = "unpaid",
//     total_amount = 0,
//     shipping_address,
//     billing_address,
//     shipping_city,
//     shipping_state,
//     shipping_postal_code,
//     shipping_country,
//   } = await req.json();

//   // ✅ Validate enums
//   if (!STATUS_ENUM.includes(status)) return new Response(JSON.stringify({ error: "Invalid status" }), { status: 400 });
//   if (payment_method && !PAYMENT_METHOD_ENUM.includes(payment_method))
//     return new Response(JSON.stringify({ error: "Invalid payment method" }), { status: 400 });
//   if (!PAYMENT_STATUS_ENUM.includes(payment_status))
//     return new Response(JSON.stringify({ error: "Invalid payment status" }), { status: 400 });

//   // ✅ Validate customer
//   if (customer_id) {
//     const { data: customer, error: customerError } = await supabase.from("customers").select("*").eq("id", customer_id).single();
//     if (customerError) return new Response(JSON.stringify({ error: customerError.message }), { status: 500 });
//     if (!customer) return new Response(JSON.stringify({ error: "Customer not found" }), { status: 404 });
//   }

//   // ✅ Validate cart
//   if (cart_id) {
//     const { data: cart, error: cartError } = await supabase.from("carts").select("*").eq("id", cart_id).single();
//     if (cartError) return new Response(JSON.stringify({ error: cartError.message }), { status: 500 });
//     if (!cart) return new Response(JSON.stringify({ error: "Cart not found" }), { status: 404 });
//   }

//   const { data, error } = await supabase
//     .from("cloth_orders")
//     .insert({
//       customer_id,
//       customer_name,
//       customer_email,
//       customer_phone,
//       cart_id,
//       status,
//       payment_method,
//       payment_status,
//       total_amount,
//       shipping_address,
//       billing_address,
//       shipping_city,
//       shipping_state,
//       shipping_postal_code,
//       shipping_country,
//       created_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//     })
//     .select()
//     .single();

//   if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   return new Response(JSON.stringify(data), { status: 201 });
// }

export async function POST(req: Request) {
  const {
    customer_id,
    customer_name,
    customer_email,
    customer_phone,
    cart_id,
    status = "pending",
    payment_method,
    payment_status = "unpaid",
    shipping_address,
    billing_address,
    floor,
    shipping_state,
    appartment_number,
    shipping_country,
    area,
    shipping_city
  } = await req.json();

  // const { data, error } = await supabase.rpc("create_order_with_items", {
  //   p_customer_id: customer_id,
  //   p_customer_name: customer_name,
  //   p_customer_email: customer_email,
  //   p_customer_phone: customer_phone,
  //   p_cart_id: cart_id,
  //   p_status: status,
  //   p_payment_method: payment_method,
  //   p_payment_status: payment_status,
  //   p_shipping_address: shipping_address,
  //   p_billing_address: billing_address,
  //   p_floor: floor,
  //   p_shipping_state: shipping_state,
  //   p_appartment_number: appartment_number,
  //   p_shipping_country: shipping_country,
  // });
const { data, error } = await supabase.rpc("create_order_with_items_cloth", {
  p_billing_address: billing_address,
  p_cart_id: cart_id,
  p_customer_email: customer_email,
  p_customer_id: customer_id,
  p_customer_name: customer_name,
  p_customer_phone: customer_phone,
  p_floor: floor,
  p_payment_method: payment_method,
  p_payment_status: payment_status,
  p_shipping_address: shipping_address,
  p_shipping_country: shipping_country,
  p_shipping_state: shipping_state,
  p_status: status,
  p_area:area,
  p_shipping_city:shipping_city,
  p_appartment_number:appartment_number
  
});

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  return new Response(JSON.stringify({ message: "Order created", order: data }), { status: 201 });
}


// PUT Order
export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return new Response(JSON.stringify({ error: "Order ID required" }), { status: 400 });

  const {
    customer_id,
    customer_name,
    customer_email,
    customer_phone,
    cart_id,
    status,
    payment_method,
    payment_status,
    total_amount,
    shipping_address,
    billing_address,
    floor,
    shipping_state,
    appartment_number,
    shipping_country,
  } = await req.json();

  // ✅ Validate existing order
  const { data: existingOrder, error: orderError } = await supabase.from("cloth_orders").select("*").eq("id", id).single();
  if (orderError) return new Response(JSON.stringify({ error: orderError.message }), { status: 500 });
  if (!existingOrder) return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });

  // ✅ Validate enums
  if (status && !STATUS_ENUM.includes(status)) return new Response(JSON.stringify({ error: "Invalid status" }), { status: 400 });
  if (payment_method && !PAYMENT_METHOD_ENUM.includes(payment_method))
    return new Response(JSON.stringify({ error: "Invalid payment method" }), { status: 400 });
  if (payment_status && !PAYMENT_STATUS_ENUM.includes(payment_status))
    return new Response(JSON.stringify({ error: "Invalid payment status" }), { status: 400 });

  // ✅ Validate customer/cart if provided
  if (customer_id) {
    const { data: customer, error: customerError } = await supabase.from("customers").select("*").eq("id", customer_id).single();
    if (customerError) return new Response(JSON.stringify({ error: customerError.message }), { status: 500 });
    if (!customer) return new Response(JSON.stringify({ error: "Customer not found" }), { status: 404 });
  }

  if (cart_id) {
    const { data: cart, error: cartError } = await supabase.from("carts").select("*").eq("id", cart_id).single();
    if (cartError) return new Response(JSON.stringify({ error: cartError.message }), { status: 500 });
    if (!cart) return new Response(JSON.stringify({ error: "Cart not found" }), { status: 404 });
  }

  const { data, error } = await supabase
    .from("cloth_orders")
    .update({
      customer_id,
      customer_name,
      customer_email,
      customer_phone,
      cart_id,
      status,
      payment_method,
      payment_status,
      total_amount,
      shipping_address,
      billing_address,
      floor,
      shipping_state,
      appartment_number,
      shipping_country,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
}
