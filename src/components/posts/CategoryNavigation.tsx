"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Category } from "@/utils/data";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { InputSearch } from "../search/InputSearch";

interface CategoryNavigationProps {
  categories: Category[];
}

// Hàm lấy URL ảnh từ description
const extractImageUrl = (description: string) => {
  const match = description.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

export const CategoryNavigation = ({ categories }: CategoryNavigationProps) => {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-8">
        <div className="relative w-full max-w-sm">
          <InputSearch type="popover" />
        </div>
      </div>
      <h1 className="text-[#1e56a0] text-3xl font-bold mb-8">Danh mục</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const isActive = currentCategory === category.slug;
          const imageUrl =
            extractImageUrl(category.description || "") || "/assets/blog.jpeg";

          return (
            <Link
              key={category.slug}
              href={{
                pathname: "/tin-tuc",
                query: { category: category.slug }
              }}
              className={cn(
                "relative group cursor-pointer block",
                isActive && "ring-2 ring-primary ring-offset-2 rounded-lg"
              )}
            >
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={imageUrl}
                  alt={category.name}
                  width={400}
                  height={200}
                  className="w-full h-[200px] object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-white/80 px-6 py-3 rounded-lg">
                  <h2 className="text-2xl font-bold text-[#1657A7]">
                    {category.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    ({category.count})
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
