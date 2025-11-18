"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ScrollView } from "../ScrollView";
import { FeatureList } from "./FeatureList ";

const HeroSection = dynamic(() =>
  import("./Banner").then((mod) => mod.HeroSection)
);
const FeaturesSection = dynamic(() =>
  import("./FeaturesSection").then((mod) => mod.FeaturesSection)
);
const LandingSection = dynamic(() =>
  import("./LandingSection").then((mod) => mod.LandingSection)
);
const Category = dynamic(() =>
  import("./Category").then((mod) => mod.Category)
);
const WorldClassLearning = dynamic(() =>
  import("./WorldClassLearning").then((mod) => mod.WorldClassLearning)
);
const LatestNews = dynamic(() =>
  import("./LatestNews").then((mod) => mod.LatestNews)
);
const TestimonialsSlider = dynamic(() =>
  import("./Testimonials").then((mod) => mod.TestimonialsSlider)
);

export const Home = () => {
  const [homeContent, setHomeContent] = useState<any>(null);
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

  return (
    <>
      <HeroSection banner={homeContent?.acf?.banner} />
      <FeaturesSection section_1={homeContent?.acf?.section_1} />
      <ScrollView>
        <LandingSection section_2={homeContent?.acf?.section_2} />
        <div className="container max-w-7xl mx-auto pb-12 px-4">
          <FeatureList section_3={homeContent?.acf?.section_3} />
        </div>
        <Category section_4={homeContent?.acf?.section_4} />
        <TestimonialsSlider section_8={homeContent?.acf?.section_8} />
        <WorldClassLearning section_5={homeContent?.acf?.section_5} />
        <LatestNews />
      </ScrollView>
    </>
  );
};
