import { About } from "@/components/about";
import { generateMetadataHelper } from "@/utils/generateMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper("/gioi-thieu");
}

export default async function GioiThieuPage() {
  return <About />;
}
