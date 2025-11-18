import { CardBlogs } from "@/components/CardBlog";
import { clean } from "../lib/sanitizeHtml";
import { formatDate } from "@/utils/date";

export const RecentPosts = (posts: any) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Recent Posts</h2>
      <div className="space-y-4">
        {posts.map((post: any, index: number) => (
          <CardBlogs
            key={index}
            title={clean(post?.title) || ""}
            image={post?.featured_image || ""}
            tag={post?.category}
            path={`/${post?.slug}`}
            date={post?.date ? formatDate(post.date) : ""}
            desc={clean(post.excerpt) || ""}
            category={post?.category}
          />
        ))}
      </div>
    </div>
  );
};
