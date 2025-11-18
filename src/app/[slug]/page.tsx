import ErrorBoundary from "@/components/ErrorBoundary";
import { Post } from "@/components/post";
import { fetchAuth } from "@/utils/fetchAuth";
import { fetchSeo } from "@/utils/seo";
import { replaceSeoRM } from "@/utils/seoRankMath";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPostData(slug: string) {
  const api_url = process.env.NEXT_PUBLIC_API_URL || "";

  try {
    const res = await fetchAuth({
      url: `${api_url}/posts?slug=${slug}`,
      revalidate: 3600
    });
    if (!res.ok) {
      throw new Error(`Posts fetch failed with status: ${res.statusText}`);
    }
    const posts = await res.json();
    return posts ? posts[0] : null;
  } catch (error) {
    console.log("Error fetching post", error);
    return null;
  }
}

async function getSeoData(slug: string) {
  const url = process.env.NEXT_PUBLIC_API_RMS_URL || "";

  try {
    const resSeo = await fetchSeo({
      url: `${url}/${slug}`,
      revalidate: 3600
    });
    const head = await resSeo.json();
    return head.head || null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const head = await getSeoData(slug);

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

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostData(slug);

  return (
    <ErrorBoundary fallback={<h1>Lỗi phía máy chủ</h1>}>
      <Post post={post} />
    </ErrorBoundary>
  );
}
