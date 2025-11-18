import { Nganh3 } from "@/components/ngon-ngu-anh";
import { generateMetadataHelper } from "@/utils/generateMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper("/nganh-ngon-ngu-anh");
}

export default async function NganhNgonNguAnhPage() {
  return <Nganh3 />;
}
