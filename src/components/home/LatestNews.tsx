import { useEffect, useState } from "react";
import { formatDate } from "@/utils/date";
import { CardBlog, CardBlogtb } from "@/components/CardBlog";
import { clean } from "../lib/sanitizeHtml";

const Section = ({
  title,
  posts,
  type
}: {
  title: string;
  posts: any[];
  type: "blog" | "tb";
}) => (
  <div className="my-10">
    <div className="text-2xl lg:text-3xl text-blue-900 font-bold mb-6 uppercase text-center">
      {title}
    </div>

    <div
      className={
        type === "blog"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
          : "flex flex-col gap-6"
      }
    >
      {posts
        .slice(0, 6)
        .map((post, index) =>
          type === "blog" ? (
            <CardBlog
              key={index}
              title={clean(post?.title) || ""}
              image={post?.featured_image || "/assets/blog.jpeg"}
              tag={"Tin tức "}
              path={`/${post?.slug}`}
              date={post?.date ? formatDate(post.date) : ""}
              desc={""}
              category={post?.category}
            />
          ) : (
            <CardBlogtb
              key={index}
              title={clean(post?.title) || ""}
              image={post?.featured_image || "/assets/blog.jpeg"}
              tag={"Thông báo"}
              path={`/${post?.slug}`}
              date={post?.date ? formatDate(post.date) : ""}
              desc={clean(post.excerpt) || ""}
              bgTag={"#38a169"}
            />
          )
        )}
    </div>
  </div>
);

export const LatestNews = () => {
  const [news, setNews] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    const fetchByCategory = async (
      categoryId: number,
      setter: (data: any[]) => void
    ) => {
      try {
        const res = await fetch(
          `/api/posts?page=1&per_page=6&category=${categoryId}`
        );
        if (!res.ok) throw new Error(`Failed to fetch category ${categoryId}`);
        const data = await res.json();
        setter(data.posts || []);
      } catch (error) {
        console.error(`Error fetching category ${categoryId}:`, error);
      }
    };

    // Tin tức: category_id = 2 | Thông báo: category_id = 1
    fetchByCategory(2, setNews);
    fetchByCategory(1, setAnnouncements);
  }, []);

  return (
    <div className="py-[70px] max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 gap-0">
        <div className="lg:col-span-2 mb-[30px]">
          <Section title="Tin tức" posts={news} type="blog" />
        </div>
        <div className="lg:col-span-1">
          <Section title="Thông báo" posts={announcements} type="tb" />
        </div>
      </div>
    </div>
  );
};
