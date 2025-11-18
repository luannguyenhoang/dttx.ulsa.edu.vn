import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type") || "";
  const api_url = process.env.NEXT_PUBLIC_API_URL || "";

  let contentPage: any[] = [];

  try {
    const endPoint = `${api_url}/${type}`;

    const res = await fetch(endPoint, {
      next: { revalidate: 1 }
    });
    if (!res.ok) {
      throw new Error(`Posts fetch failed with status: ${res.statusText}`);
    }
    contentPage = (await res?.json()) || [];
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({
    contentPage
  });
}
