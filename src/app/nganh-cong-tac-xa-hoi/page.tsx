import { Nganh1 } from "@/components/cong-tac-xa-hoi";
import { generateMetadataHelper } from "@/utils/generateMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper("/nganh-cong-tac-xa-hoi");
}

export default async function NganhCongTacXaHoiPage() {
  return <Nganh1 />;
}
