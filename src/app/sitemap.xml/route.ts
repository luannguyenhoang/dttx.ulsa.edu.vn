import { TMenus, menus } from "@/router";
import { fetchAuth } from "@/utils/fetchAuth";
import { NextResponse } from "next/server";

const URL = process.env.NEXT_PUBLIC_DOMAIN || "https://dttx.ulsa.edu.vn";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const PER_PAGE = 100;

const getAllPaths = (menus: TMenus): string[] => {
  const paths: string[] = [];
  menus.forEach((menu) => {
    if (menu.path !== "#") paths.push(menu.path);
    if (menu?.childs) {
      paths.push(...getAllPaths(menu.childs));
    }
  });
  return paths;
};

const generateSiteMap = (posts: any[]): string => {
  const staticPaths = getAllPaths(menus);
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPaths.map((path) => `<url><loc>${URL}${path}</loc></url>`).join("")}
    ${posts
      .map(
        ({ slug }: { slug: string }) => `<url><loc>${URL}/${slug}</loc></url>`
      )
      .join("")}
  </urlset>`;
};

export async function GET() {
  try {
    const resPage1 = await fetchAuth({
      url: `${API_URL}/posts?_embed&per_page=${PER_PAGE}&status=publish&page=1&_fields=slug`,
      revalidate: 3600
    });

    if (!resPage1.ok) throw new Error("Failed to fetch page 1");

    const totalPages = parseInt(resPage1.headers.get("X-WP-TotalPages") || "1");
    const dataPage1 = await resPage1.json();
    let allPosts = [...dataPage1];

    if (totalPages > 1) {
      const fetches = [];
      for (let page = 2; page <= totalPages; page++) {
        fetches.push(
          fetchAuth({
            url: `${API_URL}/posts?_embed&per_page=${PER_PAGE}&status=publish&page=${page}&_fields=slug`,
            revalidate: 3600
          }).then((r) => r.json())
        );
      }
      const restPages = await Promise.all(fetches);
      restPages.forEach((posts) => allPosts.push(...posts));
    }

    const sitemap = generateSiteMap(allPosts);
    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "text/xml"
      }
    });
  } catch (err) {
    console.error("Sitemap error", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
