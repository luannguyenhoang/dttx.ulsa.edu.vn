"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { toSlug } from "@/utils/toSlug";
import { deleteSpace } from "@/utils/deleteSpace";

const ListSearchPosts = dynamic(() =>
  import("./ListSearchPosts").then((mod) => mod.ListSearchPosts)
);

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [keyWord, setKeyWord] = useState<any>();
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const str = toSlug({ input: searchQuery });
    if (str !== "") {
      router.push(`/tim-kiem?keyword=${str}&page=1`);
    } else {
      setIsCorrect(true);
    }
  };

  useEffect(() => {
    const str = toSlug({ input: searchQuery });
    if (searchQuery !== "" && str === "") {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    setKeyWord(keyword || "");
  }, [searchParams]);

  const handleRouter = ({ selected }: { selected: number }) => {
    router.push(`/tim-kiem?keyword=${keyWord}&page=${selected + 1}`);
  };

  return (
    <>
      <div className="relative h-[350px] flex flex-col items-center justify-start py-[120px]">
        <div className="absolute top-0 left-0 w-full h-full bg-[#07294dc0] opacity-80 z-10"></div>
        <Image
          src="/assets/tdh-ldxh.webp"
          alt="image-alt-text"
          layout="fill"
          objectFit="cover"
          objectPosition="0 80%"
        />
        <div className="relative z-20 max-w-7xl w-full px-4">
          <div className="flex flex-col items-center pb-16">
            <form onSubmit={onSearch} className="flex justify-center">
              <input
                required
                value={searchQuery}
                type="text"
                className="border border-white bg-white text-black rounded-l-[15px] max-w-2xl h-12 px-4 focus:outline-none focus:border-blue-500"
                placeholder="Nhập vào từ khóa..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="h-12 px-4 bg-[#1657A7] text-black border-2 border-blue-500 rounded-r-[15px] transition duration-300 hover:bg-white hover:text-black"
              >
                Tìm kiếm
              </button>
            </form>
            {isCorrect && (
              <div className="pt-2 text-white text-center">
                <p>Tìm kiếm của bạn mang lại không có kết quả.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto py-16 px-4">
        <div className="min-h-[300px]">
          {keyWord !== "" && (
            <>
              <h2 className="text-2xl text-[#07294d] pb-10 text-center">
                Kết quả tìm kiếm : {deleteSpace(keyWord)}
              </h2>
              <ListSearchPosts handleRouter={handleRouter} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
