"use client";

import { useEffect, useState } from "react";
import { ContactSection } from "./ContactSection";

export const Contact = () => {
  const [homeContent, setHomeContent] = useState<any>(null);

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=lien-he`, {
          next: { revalidate: 3 }
        });
        const data = await res.json();
        setHomeContent(data?.contentPage[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getHomeContent();
  }, []);
  return (
    <>
      <ContactSection list={homeContent?.acf} />
    </>
  );
};
