import { supabase } from "@/lib/supabaseClient"

export default async function Home() {
  const { data: products, error } = await supabase.from("products").select("*")

  if (error) {
    console.error("Supabase error:", error.message)
  }

  return (  
    <main className="p-8">
      <h1 className="text-xl font-bold mb-4">Supabase Test</h1>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <ul>
        {products?.map((p: any) => (
          <li key={p.id}>{p.name} — ${p.price}</li>
        ))}
      </ul>
    </main>
  )
}
