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
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[620px]">
              <Image
                src={slide.image}
                alt={`Educational banner ${index + 1}`}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmX/9k="
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
