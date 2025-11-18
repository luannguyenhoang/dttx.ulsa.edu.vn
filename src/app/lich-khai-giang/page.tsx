import { Lkg } from "@/components/lich-khai-giang";
import { generateMetadataHelper } from "@/utils/generateMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper("/lich-khai-giang");
}

export default async function LichKhaiGiangPage() {
  return <Lkg />;
}
