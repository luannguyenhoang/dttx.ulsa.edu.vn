"use client";

import { useEffect, useState } from "react";
import { FeatureList } from "../home/FeatureList ";
import { AcademicPrograms } from "./CategoryHero";
import FAQ from "./FAQ";

export const CategoryPage = () => {
  const [homeContent, setHomeContent] = useState<any>(null);
  const [pageContent, setPageContent] = useState<any>(null);

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=trang-chu`, {
          next: { revalidate: 3 }
        });
        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }
        const data = await res.json();
        setHomeContent(data?.contentPage[0]);
      } catch (error) {
        console.error("Error fetching home content:", error);
      }
    };
    getHomeContent();
  }, []);

  useEffect(() => {
    const getPageContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=nganh-dao-tao`, {
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
      <AcademicPrograms section_1={pageContent?.acf} />
      <div className="container max-w-7xl mx-auto pb-10">
        {" "}
        <FeatureList section_3={homeContent?.acf?.section_3} />
      </div>
      <FAQ section_1={pageContent?.acf} />
    </>
  );
};
