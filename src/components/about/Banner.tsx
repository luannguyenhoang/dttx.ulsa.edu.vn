import { HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = (list: any) => {
  const defaultBenefits = [
    "Linh hoạt về thời gian và địa điểm",
    "Tiết kiệm chi phí",
    "Chất lượng giáo dục được đảm bảo",
    "Phát triển kỹ năng tự học và quản lý thời gian",
    "Mở rộng cơ hội học tập cho mọi đối tượng",
    "Bằng cấp tương đương hệ chính quy"
  ];

  const rawBenefits = list?.list?.list_1?.list?.benefits;
  const benefits = Array.isArray(rawBenefits)
    ? rawBenefits
    : typeof rawBenefits === "string"
      ? rawBenefits.split(/\r?\n/)
      : defaultBenefits;

  return (
    <div className="min-h-screen bg-white">
      <div
        className="h-[300px] flex items-center justify-center relative bg-cover bg-center text-white"
        style={{
          backgroundImage: `url('${list?.list?.list_1?.backgroundImage || "/assets/Group-128.png"}')`
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative flex flex-col items-center text-center z-10">
          <h1 className="text-4xl font-bold uppercase">Giới thiệu</h1>
          <Link
            href="/"
            className="flex items-center space-x-2 mt-2 text-lg font-medium hover:opacity-80"
          >
            <HomeIcon className="w-6 h-6" />
            <span>Trang chủ</span>
          </Link>
        </div>
      </div>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Image
                src={list?.list?.list_1?.image || "/assets/logo.png"}
                alt="University Logo"
                width={80}
                height={80}
                className="object-contain"
              />
              <div className="pt-[40px]">
                <h2 className="text-xl font-bold text-[#1657A7]">
                  {list?.list?.list_1?.title_1 ||
                    "Chương trình đào tạo Đại học từ xa"}
                </h2>
                <h3 className="text-lg font-bold text-[#1657A7]">
                  {list?.list?.list_1?.title_2 ||
                    "Trường Đại học Lao động – Xã hội"}
                </h3>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-[#1657A7] font-bold whitespace-pre-line">
                {list?.list?.list_1?.description || "Mô tả mặc định..."}
              </p>

              <h3 className="font-bold text-[#1657A7] mt-6 mb-4">
                {list?.list?.list_1?.list?.title || "Lợi ích Đại học từ xa"}
              </h3>
              <ul className="list-disc pl-5 space-y-2 font-bold text-[#1657A7]">
                {benefits.map((benefit: string, index: number) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <Image
              src={list?.list?.list_2?.image || "/assets/ulsaA.png"}
              alt="Students Group Photo"
              width={600}
              height={400}
              className="w-full rounded-lg object-cover"
            />
            <p className="text-[#1657A7] font-bold whitespace-pre-line">
              {list?.list?.list_2?.description ||
                `Đại học hệ đào tạo từ xa (Distance learning) là hình thức học trong đó người học và người dạy không ở cùng một địa điểm. Người học có thể học mọi lúc, mọi nơi và vào bất kỳ thời gian nào, chỉ cần một chiếc máy tính có kết nối internet. Giảng viên sẽ giảng dạy thông qua nền tảng đào tạo e-learning`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
