import { Contact } from "@/components/contact";
import { generateMetadataHelper } from "@/utils/generateMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper("/lien-he");
}

export default async function LienHePage() {
  return <Contact />;
}
