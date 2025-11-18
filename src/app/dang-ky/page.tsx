import { Dangky } from "@/components/dang-ky";
import { generateMetadataHelper } from "@/utils/generateMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper("/dang-ky");
}

export default async function DangKyPage() {
  return <Dangky />;
}
