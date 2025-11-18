import { CategoryPage } from "@/components/nganh-dao-tao";
import { generateMetadataHelper } from "@/utils/generateMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper("/nganh-dao-tao");
}

export default async function NganhDaoTaoPage() {
  return <CategoryPage />;
}
