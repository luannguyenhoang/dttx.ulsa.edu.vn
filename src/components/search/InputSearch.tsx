"use client";

import { toSlug } from "@/utils/toSlug";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const InputSearch = ({ type }: { type: string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [checkInput, setCheckInput] = useState(false);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const str = toSlug({ input: searchQuery });
    if (str !== "") {
      router.push(`/tim-kiem?keyword=${str}&page=1`);
    }
    setSearchQuery("");
  };

  useEffect(() => {
    const str = toSlug({ input: searchQuery });
    setCheckInput(searchQuery !== "" && str === "");
  }, [searchQuery]);

  return (
    <div className="z-50">
      <form onSubmit={onSearch} className="flex items-center">
        <input
          required
          className="bg-white border border-gray-400 px-4 py-2 text-black focus:outline-none w-full"
          value={searchQuery}
          type={type || "text"}
          placeholder="Tìm kiếm..."
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(e);
            }
          }}
        />
      </form>
      {checkInput && (
        <div className="pt-2 flex justify-center text-white">
          <span>Từ khóa tìm kiếm không hợp lệ</span>
        </div>
      )}
    </div>
  );
};
