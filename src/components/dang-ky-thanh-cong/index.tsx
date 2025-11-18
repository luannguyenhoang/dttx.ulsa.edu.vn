"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { clean } from "../lib/sanitizeHtml";

export default function DangkyTc() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const idNew = "2";
  const [homeContent, setHomeContent] = useState<any>(null);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/posts/?type=news&page=${page}&idNew=${idNew}`,
          {
            next: { revalidate: 3 }
          }
        );
        const data: { posts: any[] } = await res.json();
        const { posts } = data;
        posts?.length && setPosts(posts);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getPosts();
  }, [page, idNew]);

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=cam-on`, {
          next: { revalidate: 3 }
        });
        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }
        const data = await res.json();
        setHomeContent(data?.contentPage[0]);
      } catch (error) {
        console.error("Error fetching home content:", error);
      }
    };
    getHomeContent();
  }, []);
  const section = homeContent?.acf;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-2xl font-bold">
                {section?.title || "ĐĂNG KÝ THÀNH CÔNG.."}
              </h1>
            </div>
            <div className="mt-4 border-t pt-4">
              <p className="text-base whitespace-pre-line">
                {section?.desc ||
                  `Cảm ơn bạn đã để lại thông tin. Cán bộ tư vấn Đại học Kinh Tế Quốc Dân sẽ liên hệ hỗ trợ bạn trong thời
                gian sớm nhất ❤️ 🤩 Chúc bạn một ngày làm việc thật hiệu quả...`}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Có thể bạn quan tâm</h2>
              <Link
                href="tin-tuc"
                className="text-red-500 hover:underline text-sm"
              >
                Xem tất cả
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {posts?.slice(0, 6).map((item, index) => (
                <Link key={index} href={`/${item.slug}`}>
                  <Card className="overflow-hidden cursor-pointer">
                    <div className="relative">
                      <Image
                        src={item?.featured_image}
                        alt="Document thumbnail"
                        width={400}
                        height={200}
                        className="w-full h-[180px] object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-green-600 text-white px-2 py-1 text-xs rounded">
                        {item.type}
                      </div>
                    </div>

                    <div className="p-3">
                      <h3
                        className="font-medium text-sm mb-2"
                        dangerouslySetInnerHTML={{
                          __html: clean(item.title)
                        }}
                      />
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>Admin</span>
                        <span className="ml-1">{item.date}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {section?.group?.title || "Các ngành đào tạo"}
            </h2>
            <div className="space-y-4">
              {[
                {
                  name:
                    section?.group?.list_1?.tilte || "Ngành Công tác xã hội ",
                  image:
                    section?.group?.list_1?.image || "/assets/home4_img-1.png",
                  path: section?.group?.list_1?.path || "nganh-luat-kinh-te"
                },
                {
                  name: section?.group?.list_2?.tilte || "Ngành Ngôn ngữ Anh ",
                  image:
                    section?.group?.list_2?.image || "/assets/home4_img-1.png",
                  path: section?.group?.list_2?.path
                },
                {
                  name: section?.group?.list_3?.tilte || "Ngành Luật kinh tế",
                  image:
                    section?.group?.list_3?.image || "/assets/home4_img-1.png",
                  path: section?.group?.list_3?.path
                }
              ].map((department, index) => (
                <Link href={department.path || "#"} key={index}>
                  <div className="relative rounded-md overflow-hidden my-4">
                    <Image
                      src={department.image || "/placeholder.svg"}
                      alt={department.name}
                      width={300}
                      height={150}
                      className="w-full h-[120px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <h3 className="text-white font-medium text-center px-4">
                        {department.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {section?.group_1?.title || "Mạng xã hội"}
            </h2>
            <Link href={section?.group_1?.link || "#"}>
              <Button variant="outline" className="w-full justify-between mb-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                    <path d="M12.5 6.5c1.5 -1 4 0 4.5 1.5c.5 1.5 -.5 2 -1.5 2s-1.5 -.5 -1.5 -1.5"></path>
                    <path d="M17.5 6.5c-1 -1.5 -3.5 -1.5 -5.5 0"></path>
                    <path d="M8.5 6.5c1 -1.5 3.5 -1.5 5.5 0"></path>
                    <path d="M7.5 8c-1 1.5 -1 4 0 5.5"></path>
                    <path d="M16.5 8c1 1.5 1 4 0 5.5"></path>
                    <path d="M9.5 15c1.25 1 3.75 1 5 0"></path>
                    <path d="M15 17c-2 1 -4 1 -6 0"></path>
                  </svg>
                  {section?.group_1?.title_1 || "Tiktok"}
                </div>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>

            <div className="mt-6">
              <h3 className="text-center mb-2">
                {" "}
                {section?.group_1?.title_1 || "Liên hệ trực tiếp."}
              </h3>
              <Link href={section?.group_2?.path || "tel:0917452118"}>
                <Button
                  variant="outline"
                  className="w-full justify-center text-red-500"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {section?.group_2?.phone || " 0917452118"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
