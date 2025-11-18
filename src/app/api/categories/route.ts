import { fetchAuth } from "@/utils/fetchAuth";
import { NextResponse } from "next/server";

export async function GET() {
  const api_url = process.env.NEXT_PUBLIC_API_URL || "";

  try {
    const response = await fetchAuth({
      url: `${api_url}/categories`,
      revalidate: 1
    });
    if (!response.ok) {
      throw new Error(`Posts fetch failed with status: ${response.statusText}`);
    }
    const categories = (await response.json()) || [];

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ categories: [] }, { status: 500 });
  }
}
