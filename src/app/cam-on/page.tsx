import DangkyTc from "@/components/dang-ky-thanh-cong";
import { generateMetadataHelper } from "@/utils/generateMetadata";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper("/cam-on");
}

export default async function CamOnPage() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <DangkyTc />
    </Suspense>
  );
}
