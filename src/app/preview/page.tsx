import dynamic from "next/dynamic";

const DraftPosts = dynamic(() =>
  import("@/components/draft-post").then((mod) => mod.DraftPosts)
);

export default function PreviewPage() {
  return <DraftPosts />;
}
