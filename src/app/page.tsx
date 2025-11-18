import { Home } from "@/components/home";
import { fetchSeo } from "@/utils/seo";
import { replaceSeoRM } from "@/utils/seoRankMath";
import type { Metadata } from "next";

async function getSeoData() {
  const api_rm_url = process.env.NEXT_PUBLIC_API_RMS_URL || "";
  const api_url = `${api_rm_url}`;

  try {
    const res = await fetchSeo({ url: api_url, revalidate: 3600 });
    const head = await res.json();
    return head?.head || null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const head = await getSeoData();
  if (!head) {
    return {};
  }

  const getTitleFromMeta = (head: string) => {
    const match = head.match(/<meta\s+property="og:title"\s+content="([^"]*)"/);
    return match ? match[1] : null;
  };

  const title = getTitleFromMeta(head);
  const processedHead = replaceSeoRM(head);

  const metaTags: Record<string, string> = {};
  const ogTags: Record<string, string> = {};

  const titleMatch = processedHead.match(/<title[^>]*>([^<]+)<\/title>/);
  if (titleMatch) metaTags.title = titleMatch[1];

  const metaMatches = processedHead.matchAll(
    /<meta\s+([^>]*name=["']([^"']+)["'][^>]*content=["']([^"']+)["']|content=["']([^"']+)["'][^>]*name=["']([^"']+)["'])[^>]*>/gi
  );
  for (const match of metaMatches) {
    const name = match[2] || match[6];
    const content = match[3] || match[4];
    if (name && content) metaTags[name] = content;
  }

  const ogMatches = processedHead.matchAll(
    /<meta\s+property=["']og:([^"']+)["'][^>]*content=["']([^"']+)["'][^>]*>/gi
  );
  for (const match of ogMatches) {
    ogTags[`og:${match[1]}`] = match[2];
  }

  // Parse canonical link
  const canonicalMatch = processedHead.match(
    /<link\s+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i
  );
  const canonicalUrl = canonicalMatch ? canonicalMatch[1] : null;

  return {
    title: title || metaTags.title,
    ...Object.fromEntries(Object.entries(metaTags).map(([k, v]) => [k, v])),
    openGraph: Object.fromEntries(
      Object.entries(ogTags).map(([k, v]) => [k.replace("og:", ""), v])
    ),
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl
      }
    })
  };
}

export default async function HomePage() {
  return <Home />;
}
