import { RecentPosts } from "@/components/posts/RecentPosts";

interface SidebarContentProps {
  categories: any[];
  recentPosts: any[];
}

export const SidebarContent = ({ recentPosts }: SidebarContentProps) => {
  return (
    <div className="space-y-12 p-6 sticky top-4">
      <RecentPosts posts={recentPosts} />
    </div>
  );
};
