import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
        const cookieStore = await cookies(); // ✅ Await this

  const isAdmin = cookieStore.get("isAdmin")?.value === "true";
  return NextResponse.json({ isAdmin });
}
