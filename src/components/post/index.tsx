"use client";

import { CardRecentPosts } from "@/components/CardBlog";
import styles from "@/styles/Post.module.css";
import { formatDate } from "@/utils/date";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clean } from "../lib/sanitizeHtml";
import { Share } from "./Share";
import { FormWrapper } from "../FormWrapper";

export const Post = ({ post }: { post: any }) => {
  const catIds = post?.categories || [];
  const catId = catIds[0];

  const [categories, setCategories] = useState<any[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchRecentPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setRecentPosts(data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchCategories();
    fetchRecentPosts();
  }, []);

  useEffect(() => {
    const replaceHrefWithId = () => {
      const ezTocContainer = document.getElementById("ez-toc-container");

      if (ezTocContainer) {
        const tocLinks = ezTocContainer.querySelectorAll('a[href*="#"]');
        tocLinks.forEach((link) => {
          link.addEventListener("click", (event) => {
            event.preventDefault();
            const href = link.getAttribute("href");
            const match = href?.match(/#(.+)$/);

            if (match && match[1]) {
              const id = match[1];
              const targetElement = document.getElementById(id);

              if (targetElement) {
                const offset = 150;
                const targetElementTop =
                  targetElement.getBoundingClientRect().top;
                window.scrollTo({
                  top: window.scrollY + targetElementTop - offset,
                  behavior: "smooth"
                });
              }
            }
          });
        });
      }
    };

    replaceHrefWithId();
  }, [post]);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="max-w-5xl mx-auto p-6">
            <article className={styles["post"]}>
              <div className={styles["post--share"]}>
                <Share url={post?.slug || "#"} />
              </div>
              <main>
                {post && (
                  <>
                    <div className={styles["post__main"]}>
                      <div className={styles["post__heading"]}>
                        <h1
                          dangerouslySetInnerHTML={{
                            __html: clean(post?.title?.rendered)
                          }}
                        />
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: clean(post?.content?.rendered)
                        }}
                      />
                    </div>
                  </>
                )}

                {!post && (
                  <div className={styles["not-found"]}>
                    <p>Bài viết này không tồn tại!</p>
                    <Link className={styles["back-new"]} href={"/tin-tuc"}>
                      Trở về trang tin tức
                    </Link>
                  </div>
                )}
              </main>
            </article>
          </div>
        </div>
        <div className="relative">
          <div className="space-y-12 lg:sticky lg:top-[170px] ">
            <FormWrapper type="form-main" />
            {recentPosts.slice(0, 5).map((post, index) => (
              <CardRecentPosts
                key={index}
                title={clean(post?.title) || ""}
                image={post?.featured_image || ""}
                path={`/${post?.slug}`}
                date={post?.date ? formatDate(post.date) : ""}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
