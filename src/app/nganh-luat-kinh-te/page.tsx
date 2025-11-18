import { Nganh2 } from "@/components/luat-kinh-te";
import { generateMetadataHelper } from "@/utils/generateMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper("/nganh-luat-kinh-te");
}

export default async function NganhLuatKinhTePage() {
  return <Nganh2 />;
}
