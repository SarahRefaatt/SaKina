// import { supabase } from "@/lib/supabaseClient"
// export async function GET(req: Request) {

//     const url = new URL(req.url)           // parse full URL
//     const id = url.searchParams.get("id") // get ?id=1
//     if (id && !isNaN(Number(id))) {
//         const { data: orderItem, error } = await supabase
//           .from("cloth_order_items")
//           .select("*")
//           .eq("id", Number(id))   // convert to integer
//           .single()
    
//         if (error) {
//           return new Response(JSON.stringify({ error: error.message }), { status: 500 })
//         }
//         return new Response(JSON.stringify(orderItem), { status: 200 })
//       }

//      const order_id = url.searchParams.get("order_id")
//      if (order_id && !isNaN(Number(order_id))) {
//         const { data: orderItems, error } = await supabase
//             .from("order_items")
//             .select("*")
//             .eq("order_id", Number(order_id))   // convert to integer
    
//         if (error) {
//             return new Response(JSON.stringify({ error: error.message }), { status: 500 })
//         }
//         return new Response(JSON.stringify(orderItems), { status: 200 })
//         }

//   const { data, error } = await supabase.from("order_items").select("*")

//   if (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     })
//   }

//   return new Response(JSON.stringify(data), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   })
// }

// // export async function POST(req: Request) {
// //   const { order_id, product_id, quantity } = await req.json();

// //   if (!order_id || !product_id || !quantity) {
// //     return new Response(
// //       JSON.stringify({ error: "Missing required fields" }),
// //       { status: 400, headers: { "Content-Type": "application/json" } }
// //     );
// //   }

// //   // 1️⃣ Check order exists
// //   const { data: order, error: orderError } = await supabase
// //     .from("orders")
// //     .select("*")
// //     .eq("id", order_id)
// //     .single();

// //   if (orderError || !order) {
// //     return new Response(
// //       JSON.stringify({ error: "Invalid order_id" }),
// //       { status: 400, headers: { "Content-Type": "application/json" } }
// //     );
// //   }

// //   // 2️⃣ Check product exists
// //   const { data: product, error: productError } = await supabase
// //     .from("products")
// //     .select("*")
// //     .eq("id", product_id)
// //     .single();

// //   if (productError || !product) {
// //     return new Response(
// //       JSON.stringify({ error: "Invalid product_id" }),
// //       { status: 400, headers: { "Content-Type": "application/json" } }
// //     );
// //   }

// //   // 3️⃣ Validate stock
// //   if (quantity > product.stock_quantity) {
// //     return new Response(
// //       JSON.stringify({ error: "Not enough stock available" }),
// //       { status: 400, headers: { "Content-Type": "application/json" } }
// //     );
// //   }

// //   // 4️⃣ Reduce stock
// //   const { data: updatedProduct, error: stockError } = await supabase
// //     .from("products")
// //     .update({ stock_quantity: product.stock_quantity - quantity })
// //     .eq("id", product_id)
// //     .select()
// //     .single();

// //   if (stockError) {
// //     return new Response(
// //       JSON.stringify({ error: stockError.message }),
// //       { status: 500, headers: { "Content-Type": "application/json" } }
// //     );
// //   }

// //   // 5️⃣ Calculate price & total
// //   const price = product.price;
// //   const total = price * quantity;

// //   // 6️⃣ Insert order_item
// //   const { data: orderItem, error: insertError } = await supabase
// //     .from("order_items")
// //     .insert([{ order_id, product_id, quantity, price, total }])
// //     .select()
// //     .single();

// //   if (insertError) {
// //     // rollback stock in case of error
// //     await supabase
// //       .from("products")
// //       .update({ stock_quantity: product.stock_quantity })
// //       .eq("id", product_id);
// //     return new Response(
// //       JSON.stringify({ error: insertError.message }),
// //       { status: 500, headers: { "Content-Type": "application/json" } }
// //     );
// //   }

// //   // 7️⃣ Update order total_amount
// //   const { data: totalUpdate, error: totalError } = await supabase
// //     .from("orders")
// //     .update({
// //       total_amount: order.total_amount + total,
// //       updated_at: new Date().toISOString()
// //     })
// //     .eq("id", order_id)
// //     .select()
// //     .single();

// //   if (totalError) {
// //     return new Response(
// //       JSON.stringify({ error: totalError.message }),
// //       { status: 500, headers: { "Content-Type": "application/json" } }
// //     );
// //   }

// //   // 8️⃣ Return order item + updated order info
// //   return new Response(
// //     JSON.stringify({ orderItem, order: totalUpdate }),
// //     { status: 201, headers: { "Content-Type": "application/json" } }
// //   );
// // }
// export async function POST(req: Request) {
//   const { order_id, items } = await req.json();

//   if (!order_id || !Array.isArray(items) || items.length === 0) {
//     return new Response(
//       JSON.stringify({ error: "Missing order_id or items array" }),
//       { status: 400, headers: { "Content-Type": "application/json" } }
//     );
//   }

//   // 1️⃣ Check order exists
//   const { data: order, error: orderError } = await supabase
//     .from("orders")
//     .select("*")
//     .eq("id", order_id)
//     .single();

//   if (orderError || !order) {
//     return new Response(
//       JSON.stringify({ error: "Invalid order_id" }),
//       { status: 400, headers: { "Content-Type": "application/json" } }
//     );
//   }

//   let totalOrderAmount = order.total_amount || 0;
//   const orderItemsToInsert: any[] = [];

//   // 2️⃣ Loop through each product
//   for (const item of items) {
//     const { product_id, quantity } = item;

//     if (!product_id || !quantity || quantity <= 0) {
//       return new Response(
//         JSON.stringify({ error: "Invalid product_id or quantity" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // 2a️⃣ Fetch product
//     const { data: product, error: productError } = await supabase
//       .from("products")
//       .select("*")
//       .eq("id", product_id)
//       .single();

//     if (productError || !product) {
//       return new Response(
//         JSON.stringify({ error: `Product ${product_id} not found` }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // 2b️⃣ Check stock
//     if (quantity > product.stock_quantity) {
//       return new Response(
//         JSON.stringify({ error: `Not enough stock for product ${product_id}` }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // 2c️⃣ Reduce stock
//     const { error: stockError } = await supabase
//       .from("products")
//       .update({ stock_quantity: product.stock_quantity - quantity })
//       .eq("id", product_id);

//     if (stockError) {
//       return new Response(
//         JSON.stringify({ error: stockError.message }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // 2d️⃣ Prepare order item
//     const price = product.price;
//     const total = price * quantity;
//     totalOrderAmount += total;

//     orderItemsToInsert.push({ order_id, product_id, quantity, price, total });
//   }

//   // 3️⃣ Insert all order items at once
//   const { data: insertedItems, error: insertError } = await supabase
//     .from("order_items")
//     .insert(orderItemsToInsert)
//     .select();

//   if (insertError) {
//     return new Response(
//       JSON.stringify({ error: insertError.message }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }

//   // 4️⃣ Update order total_amount
//   const { data: updatedOrder, error: totalError } = await supabase
//     .from("orders")
//     .update({ total_amount: totalOrderAmount, updated_at: new Date().toISOString() })
//     .eq("id", order_id)
//     .select()
//     .single();

//   if (totalError) {
//     return new Response(
//       JSON.stringify({ error: totalError.message }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }

//   return new Response(
//     JSON.stringify({ orderItems: insertedItems, order: updatedOrder }),
//     { status: 201, headers: { "Content-Type": "application/json" } }
//   );
// }



// export async function PUT(req: Request) {
//   const url = new URL(req.url);
//   const order_id = url.searchParams.get("order_id");

//   if (!order_id) {
//     return new Response(
//       JSON.stringify({ error: "Missing order_id in query params" }),
//       { status: 400, headers: { "Content-Type": "application/json" } }
//     );
//   }

//   const { items } = await req.json();

//   if (!Array.isArray(items) || items.length === 0) {
//     return new Response(
//       JSON.stringify({ error: "Missing items array" }),
//       { status: 400, headers: { "Content-Type": "application/json" } }
//     );
//   }

//   // 1️⃣ Check if order exists
//   const { data: order, error: orderError } = await supabase
//     .from("orders")
//     .select("*")
//     .eq("id", order_id)
//     .single();

//   if (orderError || !order) {
//     return new Response(
//       JSON.stringify({ error: "Order not found" }),
//       { status: 404, headers: { "Content-Type": "application/json" } }
//     );
//   }

//   let totalOrderAmount = 0;
//   const updatedItems: any[] = [];

//   for (const item of items) {
//     const { product_id, quantity } = item;

//     if (!product_id || !quantity || quantity <= 0) {
//       return new Response(
//         JSON.stringify({ error: "Invalid product_id or quantity" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // 2️⃣ Fetch product
//     const { data: product, error: productError } = await supabase
//       .from("products")
//       .select("*")
//       .eq("id", product_id)
//       .single();

//     if (productError || !product) {
//       return new Response(
//         JSON.stringify({ error: `Product ${product_id} not found` }),
//         { status: 404, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // 3️⃣ Check stock
//     if (quantity > product.stock_quantity) {
//       return new Response(
//         JSON.stringify({ error: `Not enough stock for product ${product_id}` }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // 4️⃣ Update stock
//     const { error: stockError } = await supabase
//       .from("products")
//       .update({ stock_quantity: product.stock_quantity - quantity })
//       .eq("id", product_id);

//     if (stockError) {
//       return new Response(
//         JSON.stringify({ error: stockError.message }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // 5️⃣ Update order item
//     const price = product.price;
//     const total = price * quantity;
//     totalOrderAmount += total;

//     const { data: updatedItem, error: updateError } = await supabase
//       .from("order_items")
//       .update({ quantity, price, total })
//       .eq("order_id", order_id)
//       .eq("product_id", product_id)
//       .select()
//       .single();

//     if (updateError) {
//       return new Response(
//         JSON.stringify({ error: updateError.message }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     updatedItems.push(updatedItem);
//   }

//   // 6️⃣ Update order total_amount
//   const { data: updatedOrder, error: totalError } = await supabase
//     .from("orders")
//     .update({ total_amount: totalOrderAmount, updated_at: new Date().toISOString() })
//     .eq("id", order_id)
//     .select()
//     .single();

//   if (totalError) {
//     return new Response(
//       JSON.stringify({ error: totalError.message }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }

//   return new Response(
//     JSON.stringify({ updatedItems, order: updatedOrder }),
//     { status: 200, headers: { "Content-Type": "application/json" } }
//   );
// }


import { supabase } from "@/lib/supabaseClient";

// GET Order Items
export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const order_id = url.searchParams.get("order_id");

  if (id) {
    const { data, error } = await supabase.from("cloth_order_items").select("*").eq("id", Number(id)).single();
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  }

  if (order_id) {
    const { data, error } = await supabase.from("cloth_order_items").select("*").eq("order_id", Number(order_id));
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  }

  const { data, error } = await supabase.from("cloth_order_items").select("*");
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  return new Response(JSON.stringify(data), { status: 200 });
}
interface orderItem {
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  total: number;
}
// POST Order Items (multiple items at once)
export async function POST(req: Request) {
  const { order_id, items } = await req.json();
  if (!order_id || !Array.isArray(items) || items.length === 0) {
    return new Response(JSON.stringify({ error: "Missing order_id or items array" }), { status: 400 });
  }

  const { data: order, error: orderError } = await supabase.from("orders").select("*").eq("id", order_id).single();
  if (orderError || !order) return new Response(JSON.stringify({ error: "Invalid order_id" }), { status: 400 });

  let totalOrderAmount = order.total_amount || 0;
  const orderItemsToInsert: orderItem[] = [];

  for (const item of items) {
    const { product_id, quantity } = item;
    if (!product_id || !quantity || quantity <= 0)
      return new Response(JSON.stringify({ error: "Invalid product_id or quantity" }), { status: 400 });

    const { data: product, error: productError } = await supabase.from("products").select("*").eq("id", product_id).single();
    if (productError || !product) return new Response(JSON.stringify({ error: `Product ${product_id} not found` }), { status: 404 });
    if (quantity > product.stock_quantity) return new Response(JSON.stringify({ error: `Not enough stock for product ${product_id}` }), { status: 400 });

    // Reduce stock
    const { data: updatedProduct, error: stockError } = await supabase.rpc(
    'cloth_update_stock_atomic',
    { p_product_id: product_id, p_change: -quantity }
);
if (stockError) {
    return new Response(JSON.stringify({ error: stockError.message }), { status: 400 });
}

    // await supabase.from("products").update({ stock_quantity: product.stock_quantity - quantity }).eq("id", product_id);

    const total = product.price * quantity;
    totalOrderAmount += total;
    orderItemsToInsert.push({ order_id, product_id, quantity, price: product.price, total });
  }

  const { data: insertedItems, error: insertError } = await supabase.from("cloth_order_items").insert(orderItemsToInsert).select();
  if (insertError) return new Response(JSON.stringify({ error: insertError.message }), { status: 500 });

  const { data: updatedOrder, error: totalError } = await supabase
    .from("orders")
    .update({ total_amount: totalOrderAmount, updated_at: new Date().toISOString() })
    .eq("id", order_id)
    .select()
    .single();

  if (totalError) return new Response(JSON.stringify({ error: totalError.message }), { status: 500 });

  return new Response(JSON.stringify({ orderItems: insertedItems, order: updatedOrder }), { status: 201 });
}

// PUT Order Items
export async function PUT(req: Request) {
  const url = new URL(req.url);
  const order_id = url.searchParams.get("order_id");
  const { items } = await req.json();

  if (!order_id || !Array.isArray(items) || items.length === 0)
    return new Response(JSON.stringify({ error: "Missing order_id or items array" }), { status: 400 });

  const { data: order, error: orderError } = await supabase.from("orders").select("*").eq("id", order_id).single();
  if (orderError || !order) return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });

  let totalOrderAmount = 0;
  const updatedItems: orderItem[] = [];

  for (const item of items) {
    const { product_id, quantity } = item;
    if (!product_id || !quantity || quantity <= 0)
      return new Response(JSON.stringify({ error: "Invalid product_id or quantity" }), { status: 400 });

    const { data: product, error: productError } = await supabase.from("products").select("*").eq("id", product_id).single();
    if (productError || !product) return new Response(JSON.stringify({ error: `Product ${product_id} not found` }), { status: 404 });
    if (quantity > product.stock_quantity) return new Response(JSON.stringify({ error: `Not enough stock for product ${product_id}` }), { status: 400 });

    await supabase.from("products").update({ stock_quantity: product.stock_quantity - quantity }).eq("id", product_id);

    const total = product.price * quantity;
    totalOrderAmount += total;

    const { data: updatedItem, error: updateError } = await supabase
      .from("cloth_order_items")
      .update({ quantity, price: product.price, total })
      .eq("order_id", order_id)
      .eq("product_id", product_id)
      .select()
      .single();

    if (updateError) return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });

    updatedItems.push(updatedItem);
  }

  const { data: updatedOrder, error: totalError } = await supabase
    .from("orders")
    .update({ total_amount: totalOrderAmount, updated_at: new Date().toISOString() })
    .eq("id", order_id)
    .select()
    .single();

  if (totalError) return new Response(JSON.stringify({ error: totalError.message }), { status: 500 });

  return new Response(JSON.stringify({ updatedItems, order: updatedOrder }), { status: 200 });
}
