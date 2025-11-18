"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

interface Program {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  path: string;
}

export const AcademicPrograms = (section_1: any) => {
  const programs: Program[] = useMemo(
    () => [
      {
        id: "english",
        title: section_1?.section_1?.list?.list_1?.title || "Ngôn ngữ Anh",
        description:
          section_1?.section_1?.list?.list_1?.description ||
          "Ngôn ngữ Anh (English Studies) là ngành học nghiên cứu về các phương pháp học tập loại ngôn ngữ phổ biến, ở đây là tiếng Anh...",
        imageUrl:
          section_1?.section_1?.list?.list_1?.imageurl || "/assets/2.webp",
        path: section_1?.section_1?.list?.list_1?.path || "/nganh-01"
      },
      {
        id: "chinese",
        title: section_1?.section_1?.list?.list_2?.title || "Ngôn ngữ Trung",
        description:
          section_1?.section_1?.list?.list_2?.description ||
          "Ngôn ngữ Trung là chương trình đào tạo về tiếng Trung Quốc và văn hóa Trung Hoa.",
        imageUrl:
          section_1?.section_1?.list?.list_2?.imageurl || "/assets/2.webp",
        path: section_1?.section_1?.list?.list_2?.path || "/nganh-01"
      },
      {
        id: "ecommerce",
        title:
          section_1?.section_1?.list?.list_3?.title || "Thương mại điện tử",
        description:
          section_1?.section_1?.list?.list_3?.description ||
          "Chương trình đào tạo về kinh doanh trực tuyến và thương mại điện tử.",
        imageUrl:
          section_1?.section_1?.list?.list_3?.imageurl || "/assets/2.webp",
        path: section_1?.section_1?.list?.list_3?.path || "/nganh-01"
      }
    ],
    [section_1]
  );

  const [activeProgram, setActiveProgram] = useState<Program | null>(null);
  const router = useRouter();

  useEffect(() => {
    setActiveProgram(programs[0]);
  }, [programs]);

  const handleNavigate = () => {
    if (activeProgram) {
      router.push(activeProgram.path);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#1e3a8a] mb-8">
        {section_1?.section_1?.title || "Ngành học"}
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {programs.map((program) => (
            <button
              key={program.id}
              onClick={() => setActiveProgram(program)}
              className={`w-full text-left p-4 text-xl font-semibold transition-colors
                ${
                  activeProgram?.id === program.id
                    ? "bg-[#1e3a8a] text-white"
                    : "bg-[#1e3a8a] text-white hover:bg-[#1e3a8a]/90"
                }`}
            >
              {program.title}
            </button>
          ))}
        </div>

        <div className="relative min-h-[400px] bg-[#1e3a8a] rounded-lg overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
            style={{ backgroundImage: `url(${activeProgram?.imageUrl})` }}
          />
          {activeProgram && (
            <Card
              className="absolute left-4 right-4 top-4 p-6 bg-white/95 backdrop-blur cursor-pointer"
              onClick={handleNavigate}
            >
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">
                {activeProgram.title}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {activeProgram.description}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
