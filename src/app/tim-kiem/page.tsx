import ErrorBoundary from "@/components/ErrorBoundary";
import { Search } from "@/components/search";
import { generateMetadataHelper } from "@/utils/generateMetadata";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper("/tim-kiem");
}

export default async function TimKiemPage() {
  return (
    <ErrorBoundary fallback={<h1>Lỗi phía máy chủ</h1>}>
      <Suspense fallback={<div>Đang tải...</div>}>
        <Search />
      </Suspense>
    </ErrorBoundary>
  );
}
