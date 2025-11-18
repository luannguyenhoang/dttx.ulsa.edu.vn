"use client";

import { CardBlog, CardBlogs } from "@/components/CardBlog";
import { CategoryNavigation } from "@/components/posts/CategoryNavigation";
import { formatDate } from "@/utils/date";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { clean } from "../lib/sanitizeHtml";
import { SkeletonCardBlog } from "../SkeletonCardBlog";

export const TinTuc = () => {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 10;

  useEffect(() => {
    setCurrentCategory(searchParams.get("category"));
    setCurrentPage(0); // Reset to first page when category changes
  }, [searchParams]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const categoryId = categories.find(
          (cat) => cat.slug === currentCategory
        )?.id;
        const url = `/api/posts?page=${currentPage + 1}&per_page=${postsPerPage}${
          categoryId ? `&category=${categoryId}` : ""
        }`;

        const res = await fetch(url);
        const data = await res.json();
        setPosts(data.posts || []);
        setTotalPosts(Number(data.totalPosts || 0));
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categories.length) fetchPosts();
  }, [currentCategory, currentPage, categories]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <CategoryNavigation categories={categories} />
      <div className="grid lg:grid-cols-1 mb-4">
        <div className="lg:col-span-2 space-y-8">
          {loading ? (
            <SkeletonCardBlog large />
          ) : (
            posts
              .slice(0, 1)
              .map((post, index) => (
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
              ))
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-[10px] lg:mt-[40px]">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCardBlog key={i} />
              ))
            : posts
                .slice(1)
                .map((post, index) => (
                  <CardBlog
                    key={index}
                    title={clean(post?.title) || ""}
                    image={post?.featured_image || "/assets/blog.jpeg"}
                    tag={post?.category}
                    path={`/${post?.slug}`}
                    date={post?.date ? formatDate(post.date) : ""}
                    desc={clean(post.excerpt) || ""}
                    category={post?.category}
                  />
                ))}
        </div>
      </div>
      {!loading && (
        <div className="flex justify-end mt-8">
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={Math.ceil(totalPosts / postsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            forcePage={currentPage}
            containerClassName="flex space-x-2"
            activeClassName="bg-[#1e56a0] text-white px-3 py-1 rounded"
            pageClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
            previousClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
            nextClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
          />
        </div>
      )}
    </div>
  );
};
