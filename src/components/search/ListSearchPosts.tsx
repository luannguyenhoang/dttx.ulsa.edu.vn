"use client";

import { Loading } from "@/components/Loading";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import dynamic from "next/dynamic";
import { toSlug } from "@/utils/toSlug";
import { formatDate } from "@/utils/date";
import { clean } from "../lib/sanitizeHtml";

const CardBlogVert = dynamic(() =>
  import("@/components/CardBlogVert").then((mod) => mod.CardBlogVert)
);

export const ListSearchPosts = ({
  handleRouter
}: {
  handleRouter?: ({
    selected,
    searchText
  }: {
    selected: number;
    searchText: string;
  }) => void;
}) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [totalPosts, setTotalPosts] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const [resetpagi, setResetpagi] = useState(false);

  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  useEffect(() => {
    setResetpagi(true);
  }, [page]);

  useEffect(() => {
    const keyword = searchParams.get("keyword") || "";
    let keywords = keyword;
    var pages = Number(page || "1");
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/search/?type=news&page=${pages}&search=${toSlug({
            type: "signed",
            input: keywords
          })}`,
          {
            next: { revalidate: 3 }
          }
        );
        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }

        const data: { posts: any[]; totalPosts: string } = await res.json();
        const { posts, totalPosts } = data;
        totalPosts && setTotalPosts(totalPosts);
        setPosts(posts);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
      setResetpagi(false);
    };
    getPosts();
  }, [searchParams, page]);
  const len = Math.ceil(Number(totalPosts) / 8);

  return (
    <>
      <div className="container max-w-6xl mx-auto ">
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2">
            {posts?.map((post: any, index: number) => (
              <div key={index}>
                <CardBlogVert
                  title={clean(post?.title?.rendered)}
                  date={post?.date ? formatDate(post.date) : ""}
                  desc={clean(post?.excerpt?.rendered)}
                  bgTag="#1657A7"
                  image={post?.featured_image || ""}
                  path={`/${post?.slug}`}
                />
              </div>
            ))}
          </div>
        )}
        {posts?.length === 0 && !isLoading && (
          <div className="flex items-center justify-center h-[40vh] text-center">
            Không tìm được kết quả phù hợp
          </div>
        )}

        {isLoading && <Loading />}
      </div>
      {posts?.length > 0 && !resetpagi && (
        <div className="flex justify-center pt-8">
          <ReactPaginate
            className="flex gap-2"
            previousLabel="<"
            nextLabel=">"
            pageCount={len}
            onPageChange={handleRouter}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            activeClassName="bg-blue-600 text-white px-2 rounded"
            pageClassName="border border-gray-400 px-2 rounded cursor-pointer"
            previousClassName="border border-gray-400 px-2 rounded cursor-pointer"
            nextClassName="border border-gray-400 px-2 rounded cursor-pointer"
            disabledClassName="text-gray-400 cursor-not-allowed"
            forcePage={Number(page || "1") - 1}
          />
        </div>
      )}
    </>
  );
};
