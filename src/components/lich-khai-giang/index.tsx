"use client";

import { useEffect, useState } from "react";
import { Lkgs } from "./UpcomingEvents";
import { Category } from "../home/Category";
import { TestimonialsSlider } from "../home/Testimonials";

export const Lkg = () => {
  const [homeContent, setHomeContent] = useState<any>(null);
  const [pageContent, setPageContent] = useState<any>(null);

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=lkg`, {
          next: { revalidate: 3 }
        });
        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }
        const data = await res.json();
        setHomeContent(data?.contentPage[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getHomeContent();
  }, []);

  useEffect(() => {
    const getPageContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=trang-chu`, {
          next: { revalidate: 3 }
        });
        const data = await res.json();
        setPageContent(data?.contentPage[0]);
      } catch (error) {
        console.error("Error fetching home content:", error);
      }
    };
    getPageContent();
  }, []);
  return (
    <>
      <Lkgs section_1={homeContent?.acf} />
      <Category section_4={pageContent?.acf?.section_4} />
      <TestimonialsSlider section_8={pageContent?.acf?.section_8} />
    </>
  );
};
