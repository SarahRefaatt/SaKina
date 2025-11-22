// 
import { supabase } from "@/lib/supabaseClient";
import { list } from "@vercel/blob";
import { put } from "@vercel/blob";
import { date } from "zod";
    const token = process.env.BLOB__READ_WRITE_TOKEN;

// GET cloth_products
// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const id = url.searchParams.get("id");

//   if (id && !isNaN(Number(id))) {
//     const { data: product, error } = await supabase
//       .from("cloth_products")
//       .select("*")
//       .eq("id", Number(id))
//       .single();

//     if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//     return new Response(JSON.stringify(product), { status: 200 });
//   }

//   const { data: cloth_products, error } = await supabase.from("cloth_products").select("*");
//   if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

//   return new Response(JSON.stringify(cloth_products), { status: 200 });
// }

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");



  // // ✅ If there's an ID, get a single product
  if (id && !isNaN(Number(id))) {
    const { data: product, error } = await supabase
      .from("cloth_products")
      .select("*")
      .eq("id", Number(id))
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }



    return new Response(
      JSON.stringify({ ...product }),
      { status: 200 }
    );
  }

  console.log("fedf")
  // ✅ Get all cloth_products
  const { data: cloth_products, error } = await supabase.from("cloth_products").select("*");
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(cloth_products), { status: 200 });
}

// POST Product
// export async function POST(req: Request) {
//   const { name, description, price, stock_quantity, sku, category, brand, weight, dimensions, image_url } = await req.json();

//   if (!name || price === undefined || stock_quantity === undefined) {
//     return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
//   }

//   const { data, error } = await supabase
//     .from("cloth_products")
//     .insert({ name, description, price, stock_quantity, sku, category, brand, weight, dimensions, image_url })
//     .select()
//     .single();

//   if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   return new Response(JSON.stringify(data), { status: 201 });
// }

// PUT Product
// export async function PUT(req: Request) {
//   const url = new URL(req.url);
//   const id = url.searchParams.get("id");
//   if (!id) return new Response(JSON.stringify({ error: "Product ID is required" }), { status: 400 });

//   const { name, description, price, stock_quantity, sku, category, brand, weight, dimensions, image_url } = await req.json();

//   const { data, error } = await supabase
//     .from("cloth_products")
//     .update({ name, description, price, stock_quantity, sku, category, brand, weight, dimensions, image_url })
//     .eq("id", Number(id))
//     .select()
//     .single();

//   if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   return new Response(JSON.stringify(data), { status: 200 });
// }

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response(
      JSON.stringify({ error: "Product ID is required" }),
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("cloth_products")
    .delete()
    .eq("id", Number(id));

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({ message: "Product deleted successfully." }),
    { status: 200 }
  );
}


export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock_quantity = parseInt(formData.get("stock_quantity") as string);
    const sku = formData.get("sku") as string;
    const category = formData.get("category") as string;
    const brand = formData.get("brand") as string;
    const weight = formData.get("weight") as string;
    const dimensions = formData.get("dimensions") as string;
    const file = formData.get("file") as File | null;

    if (!name || isNaN(price) || isNaN(stock_quantity)) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid required fields" }),
        { status: 400 }
      );
    }

    let image_urls: string | null = null;

    // ✅ Upload to Blob if token and file exist
    if (file && token) {
      try {
        const { url } = await put(`cloth_products/${Date.now()}-${file.name}`, file, {
          access: "public",
          token,
        });
        image_urls = url; // Save URL
      } catch (err) {
        console.error("Blob upload failed:", err);
      }
    }

    // ✅ Insert into Supabase
    const { data, error } = await supabase
      .from("cloth_products")
      .insert({
        name,
        description,
        price,
        stock_quantity,
        sku,
        category,
        brand,
        weight,
        dimensions,
        image_urls, // correct plural field
      })
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({ error: err || "Something went wrong" }),
      { status: 500 }
    );
  }
}



export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id || isNaN(Number(id))) {
      return new Response(
        JSON.stringify({ error: "Valid Product ID is required" }),
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock_quantity = parseInt(formData.get("stock_quantity") as string);
    const sku = formData.get("sku") as string;
    const category = formData.get("category") as string;
    const brand = formData.get("brand") as string;
    const weight = parseFloat(formData.get("weight") as string);
    const dimensions = formData.get("dimensions") as string;

    // Existing arrays
    const existingImageUrls = formData.getAll("image_urls[]").map((i) => i.toString());
    const promoCodes = formData.getAll("promo_codes[]").map((c) => c.toString());

    // Upload new files
    const uploadedUrls: string[] = [];
    const files = formData.getAll("files") as File[];

    if (files.length > 0 && token) {
      for (const file of files) {
        if (file && file.name) {
          try {
            const { url } = await put(`cloth_products/${Date.now()}-${file.name}`, file, {
              access: "public",
              token,
            });
            uploadedUrls.push(url);
          } catch (err) {
            console.error("Blob upload failed:", err);
          }
        }
      }
    }

    const finalImageUrls = [...existingImageUrls, ...uploadedUrls].filter(Boolean);

    const updatedProduct = {
      name,
      description,
      price,
      stock_quantity,
      sku,
      category,
      brand,
      weight,
      dimensions,
      image_urls: finalImageUrls.length > 0 ? finalImageUrls : null, // ✅ Array or null
      promo_codes: promoCodes.length > 0 ? promoCodes : null,        // ✅ Array or null
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("cloth_products")
      .update(updatedProduct)
      .eq("id", Number(id))
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({ error: err || "Something went wrong" }),
      { status: 500 }
    );
  }
}
