"use client";

import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const HeroSection = (banner: any) => {
  const slides = [
    {
      id: "1",
      image: banner?.banner?.image_1 || "/assets/image01.png"
    },
    {
      id: "2",
      image: banner?.banner?.image_2 || "/assets/image_h2-768x513.jpg"
    },
    {
      id: "3",
      image: banner?.banner?.image_3 || "/assets/image_h2-768x513.jpg"
    }
  ];

  return (
    <div className="relative">
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/70 hover:bg-white/90 active:bg-purple-500 rounded-full shadow-md transition-transform transform hover:scale-110 z-10"
        id="prev-btn"
      >
        <span className="sr-only">Previous</span>
        <svg
          className="w-6 h-6 text-gray-700 hover:text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/70 hover:bg-white/90 active:bg-purple-500 rounded-full shadow-md transition-transform transform hover:scale-110 z-10"
        id="next-btn"
      >
        <span className="sr-only">Next</span>
        <svg
          className="w-6 h-6 text-gray-700 hover:text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: "#prev-btn",
          nextEl: "#next-btn"
        }}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id || `slide-${index}`}>
            {" "}
            {/* Đảm bảo key duy nhất */}
            <div className="relative">
              <Image
                src={slide.image}
                alt="Educational content"
                width={2356}
                height={1450}
                className="w-full h-auto max-h-[620px] slide-right object-cover"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
