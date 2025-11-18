import { fetchAuth } from "@/utils/fetchAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const api_url = process.env.NEXT_PUBLIC_API_URL || "";
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const per_page = Number(searchParams.get("per_page")) || 10;
  const category = searchParams.get("category");

  const excludedSlugs = [
    "lich-khai-giang",
    "form-main",
    "form-poup",
    "gioi-thieu",
    "cta"
  ];
  const categoryQuery = category ? `&categories=${category}` : "";

  try {
    const endPoint = `${api_url}/posts?_embed&status=publish&page=${page}&per_page=${per_page}${categoryQuery}`;
    const response = await fetchAuth({ url: endPoint, revalidate: 1 });
    const totalPostsFromAPI = Number(
      response.headers?.get("X-WP-Total") || "0"
    );

    const postsFromAPI = await response.json();
    const filteredPosts = postsFromAPI.filter(
      (post: any) => !excludedSlugs.includes(post.slug)
    );

    const posts = filteredPosts.map((post: any) => ({
      id: post.id,
      title: post.title.rendered,
      slug: post.slug,
      excerpt: post.excerpt.rendered,
      featured_image:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      date: post.date,
      categories: post.categories || []
    }));

    return NextResponse.json({
      posts,
      totalPosts: String(totalPostsFromAPI)
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ posts: [], totalPosts: "0" }, { status: 500 });
  }
}
