"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FormWrapper } from "../FormWrapper";

// CountdownTimer Component
export const CountdownTimer = ({
  title,
  targetDate
}: {
  title: string;
  targetDate: string;
}) => {
  const target = useMemo(() => new Date(targetDate), [targetDate]);
  const [mounted, setMounted] = useState(false);

  const isValidDate =
    !isNaN(target.getTime()) && targetDate !== "00-00-00" && targetDate !== "";

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  }, [target]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setMounted(true);
    if (isValidDate) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [targetDate, isValidDate, calculateTimeLeft]);

  if (!mounted) {
    // Không render gì trên server để tránh mismatch
    return null;
  }

  // Nếu không có lịch hợp lệ, hiển thị "Đang cập nhật"
  if (!isValidDate) {
    return (
      <div className="bg-[#1657A7] p-6 rounded-lg text-white mb-4 text-center">
        <h3 className="text-red-500 text-2xl font-bold mb-4">{title}</h3>
        <p className="text-xl">Đang cập nhật</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1657A7] p-6 rounded-lg text-white mb-4">
      <h3 className="text-red-500 text-2xl font-bold mb-2">{title}</h3>
      <p className="text-lg mb-4">
        📅 Sự kiện diễn ra vào:{" "}
        <span>
          {target.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "long",
            year: "numeric"
            // hour: "2-digit",
            // minute: "2-digit",
            // second: "2-digit",
          })}
        </span>
      </p>
      <div className="grid grid-cols-4 gap-4">
        {[
          { value: timeLeft.days, label: "Ngày" },
          { value: timeLeft.hours, label: "Giờ" },
          { value: timeLeft.minutes, label: "Phút" },
          { value: timeLeft.seconds, label: "Giây" }
        ].map((item) => (
          <div
            key={item.label}
            className="border border-red-500 rounded p-2 text-center"
          >
            <div className="text-2xl font-bold">
              {String(item.value).padStart(2, "0")}
            </div>
            <div className="text-sm">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
// Lkgs Component
export const Lkgs = (section_1: any) => {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#1657A7] mb-8 italic">
        {section_1?.section_1?.title || "Lịch khai giảng khóa gần nhất"}
      </h1>
      <div className="border-t-2 border-blue-700 mb-8 w-full"></div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <CountdownTimer
            title={section_1?.section_1?.title_1 || "Khai giảng tại Hà Nội"}
            targetDate={section_1?.section_1?.target_date_1 || "00-00-00"}
          />
          <CountdownTimer
            title={section_1?.section_1?.title_2 || "Khai giảng tại HCM"}
            targetDate={section_1?.section_1?.target_date_2 || "00-00-00"}
          />
        </div>
        <div className="bg-[#1657A7] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            NHẬN TÀI KHOẢN HỌC THỬ MIỄN PHÍ
          </h2>
          <FormWrapper type="form-main" />
        </div>
      </div>
    </div>
  );
};
