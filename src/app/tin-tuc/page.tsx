import { TinTuc } from "@/components/posts/TinTuc";
import { generateMetadataHelper } from "@/utils/generateMetadata";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper("/tin-tuc");
}

export default async function TinTucPage() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <TinTuc />
    </Suspense>
  );
}
