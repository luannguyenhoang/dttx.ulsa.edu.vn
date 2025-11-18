"use client";

import { FeatureList } from "../home/FeatureList ";
import { TestimonialsSlider } from "../home/Testimonials";
import { CourseSchedule } from "./CourseSchedule";
import { RegistrationForm } from "./RegistrationForm";
import { useEffect, useState } from "react";

export const Dangky = () => {
  const [homeContent, setHomeContent] = useState<any>(null);
  const [pageContent, setPageContent] = useState<any>(null);
  const [pageContents, setPageContents] = useState<any>(null);

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=dang-ky`, {
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
  useEffect(() => {
    const getPageContents = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=lkg`, {
          next: { revalidate: 3 }
        });
        const data = await res.json();
        setPageContents(data?.contentPage[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getPageContents();
  }, []);

  return (
    <>
      <RegistrationForm section_1={homeContent?.acf?.section_1} />
      <CourseSchedule section_1={pageContents?.acf} />
      <TestimonialsSlider section_8={pageContent?.acf?.section_8} />
      <div className="container max-w-7xl mx-auto pb-10">
        <FeatureList section_3={pageContent?.acf?.section_3} />
      </div>
    </>
  );
};
