"use client";

import { Lkgs } from "../lich-khai-giang/UpcomingEvents";
import { HeroSection } from "./Banner";
import { useEffect, useState } from "react";

export const About = () => {
  const [homeContent, setHomeContent] = useState<any>(null);
  const [pageContents, setPageContent] = useState<any>(null);

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=gioi-thieu`, {
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

  useEffect(() => {
    const getPageContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=lich-khai-giang`, {
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

  useEffect(() => {
    const getPageContents = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=lkg`, {
          next: { revalidate: 3 }
        });
        const data = await res.json();
        setPageContent(data?.contentPage[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getPageContents();
  }, []);
  return (
    <>
      <HeroSection list={homeContent?.acf?.list} />
      <Lkgs section_1={pageContents?.acf} />
    </>
  );
};
