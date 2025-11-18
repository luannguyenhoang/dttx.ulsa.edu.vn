"use client";

import dynamic from "next/dynamic";
import { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { BackToTop } from "../BackToTop";
import { CTA } from "./components/Cta";
import { Header } from "./components/DesktopMenu";
import { TrackingSession } from "../TrackingSession";

const Footer = dynamic(() =>
  import("@/components/layout/Footer").then((mod) => mod.Footer)
);
// const Header = dynamic(() =>
//   import("@/components/layout/Header").then((mod) => mod.Header)
// );

const Layout = ({ children }: { children: ReactNode }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > 500) {
      setShowCTA(true);
    } else {
      setShowCTA(false);
    }
  }, [scrollPosition]);
  return (
    <>
      <TrackingSession />
      <Header />
      <main className="bg-white ">
        <section className="w-full max-w-[1920px] mx-auto">{children}</section>
        <div ref={ref} className="h-[1px]" />
        {showCTA && <CTA />}
      </main>
      <BackToTop />
      {inView && <Footer />}
    </>
  );
};

export default Layout;
