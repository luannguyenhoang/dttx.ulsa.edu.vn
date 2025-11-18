"use client";

import Image from "next/image";
import { FaRegStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const TestimonialsSlider = (section_8: any) => {
  const testimonials = [
    {
      id: 1,
      quote:
        section_8?.section_8?.list?.list_1?.quote ||
        "Ultimately, MasterLife is what really became the driving force behind the career change. Ut morbi tincidunt augue interdum. Enim sed faucibus turpis in eu. Scelerisque felis imperdiet proin fermentum le",
      author: section_8?.section_8?.list?.list_1?.author || "Taman Joo",
      role: section_8?.section_8?.list?.list_1?.role || "Co-Founders",
      avatar: section_8?.section_8?.list?.list_1?.image || "/assets/v.webp"
    },
    {
      id: 2,
      quote:
        section_8?.section_8?.list?.list_2?.quote ||
        "The learning experience has been incredible. The structured curriculum and hands-on projects have helped me gain practical skills that I use in my daily work.",
      author: section_8?.section_8?.list?.list_2?.author || "Sarah Chen",
      role: section_8?.section_8?.list?.list_2?.role || "UX Designer",
      avatar: section_8?.section_8?.list?.list_2?.image || "/assets/v.webp"
    },
    {
      id: 3,
      quote:
        section_8?.section_8?.list?.list_3?.quote ||
        "I've tried many online learning platforms, but this one stands out. The community support and mentor guidance have been invaluable to my growth as a developer.",
      author: section_8?.section_8?.list?.list_3?.author || "Michael Ross",
      role: section_8?.section_8?.list?.list_3?.role || "Software Engineer",
      avatar: section_8?.section_8?.list?.list_3?.image || "/assets/v.webp"
    }
  ];
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container max-w-7xl  mx-auto px-4 ">
        <div className="grid  gap-8 grid-cols-1 lg:grid-cols-1 border-2 border-blue-700 lg:p-12 p-4 rounded-3xl">
          <div className="text-blue-800 border-blue-700 text-center lg:text-left">
            <div className="text-4xl font-bold  text-center">
              {" "}
              {section_8?.section_8?.title_1 || "ĐÁNH GIÁ CỦA HỌC VIÊN"}
            </div>
            <div className="mt-6 text-2xl text-center">
              {section_8?.section_8?.title_2 || "Học viên nói gì về hệ từ xa"}
            </div>
            <div className="mt-3 text-2xl font-bold text-center">
              {section_8?.section_8?.title_3 ||
                "Trường Đại học Lao động - Xã hội"}
            </div>
          </div>
          <div>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={{
                prevEl: "#prev-btn",
                nextEl: "#next-btn"
              }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
                renderBullet: (index, className) =>
                  `<span class="${className} swiper-pagination-bullet"></span>`
              }}
              loop={true}
              className="static"
              slidesPerView={1}
              breakpoints={{
                1024: { slidesPerView: 2 }
              }}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="text-blue-800">
                    <div className="flex items-center justify-center">
                      <div className="relative w-28 h-28 rounded-full border-8 border-white bg-white">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                    </div>
                    <div className="text-center mt-2 space-y-2">
                      <div className="flex items-center justify-center font-semibold space-x-1">
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                      </div>
                      <div className="font-bold text-xl pt-3">
                        {testimonial.role}
                      </div>
                    </div>
                    <blockquote className="text-center text-lg italic m-6">
                      {testimonial.quote}
                    </blockquote>
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-pagination mt-[-6px]"></div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};
