import { Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsThreads } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
export const Footer = () => {
  const [homeContent, setHomeContent] = useState<any>(null);
  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=trang-chu`, {
          next: { revalidate: 3 }
        });
        const data = await res.json();
        setHomeContent(data?.contentPage[0]);
      } catch (error) {
        console.error("Error fetching home content:", error);
      }
    };
    getHomeContent();
  }, []);
  const footer = homeContent?.acf.footer;
  const socialLinks = [
    {
      icon: Facebook,
      href:
        footer?.list_1?.link_1 || "https://www.facebook.com/daihoctuxa.eulsa"
    },
    {
      icon: FaTiktok,
      href: footer?.list_1?.link_2 || "https://www.tiktok.com/@ulsa.elearning"
    },
    { icon: Youtube, href: footer?.list_1?.link_3 || "#" },
    { icon: Instagram, href: footer?.list_1?.link_4 || "#" },
    { icon: BsThreads, href: footer?.list_1?.link_5 || "#" }
  ];
  return (
    <footer className="bg-[#1e56a0] text-white py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[30%_10%_20%_24%] gap-12">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-start">
              <Image
                src={footer?.list_1?.image_1 || "/assets/logo.png"}
                alt="Logo 1"
                width={80}
                height={80}
                className="w-24 h-24 object-contain"
              />
              <Image
                src={footer?.list_1?.image_2 || "/assets/logoAum.png"}
                alt="Logo 2"
                width={100}
                height={100}
                className="w-28 h-28 object-contain"
              />
            </div>
            <p className="text-lg max-w-md text-center md:text-left ">
              {footer?.list_1?.title_1 || "CHƯƠNG TRÌNH ĐẠI HỌC TỪ XAs"}
            </p>
            <p className="!mt-[2px] text-[15px]">
              {footer?.list_1?.title_2 ||
                "Đào tạo cử nhân trực tuyến - Phù hợp với mọi đối tượng."}
            </p>
            <p className="!mt-[2px] text-[15px]  whitespace-pre-line">
              {footer?.list_1?.description || ""}
            </p>
            <div className="flex items-center gap-4 mt-4  border-t border-white p-2 w-[150px]">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="hover:opacity-80"
                >
                  <social.icon className="text-[#fff]" size={24} />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-lg w-full text-center md:text-left ">
            <nav className="grid gap-2">
              <Link
                href="/"
                className="inline-block border-b border-white hover:underline w-auto pb-2"
              >
                Trang chủ
              </Link>
              <Link
                href="/lich-khai-giang"
                className="inline-block border-b border-white hover:underline w-auto pb-2"
              >
                Lịch khai giảng
              </Link>
              <Link
                href="/nganh-dao-tao"
                className="inline-block border-b border-white hover:underline w-auto pb-2"
              >
                Ngành đào tạo
              </Link>
              <Link
                href="/tin-tuc"
                className="inline-block border-b border-white hover:underline w-auto pb-2"
              >
                Tin tức
              </Link>
              <Link
                href="/dang-ky"
                className="inline-block hover:underline w-auto pb-2"
              >
                Đăng ký
              </Link>
            </nav>
          </div>

          <div className="space-y-4 text-center md:text-left ">
            <div className="space-y-2 text-lg">
              <h3 className="font-semibold text-lg border-b border-white pb-2">
                {footer?.list_2?.title || "Liên hệ"}
              </h3>
              <nav className="grid gap-2">
                <Link
                  href={footer?.list_2?.list_1?.link || "/"}
                  className=" hover:underline w-auto pb-2"
                >
                  {footer?.list_2?.list_1?.title || "Facebook: abcxyc.com"}
                </Link>
                <Link
                  href={footer?.list_2?.list_2?.link || "https://abcxyc.com"}
                  className="text-white hover:underline"
                >
                  {footer?.list_2?.list_2?.title || "Website: abcxyc.com"}
                </Link>
                <Link
                  href={
                    footer?.list_2?.list_3?.link ||
                    "https://www.facebook.com/Thongtindaihoctuxatructuyen"
                  }
                  className="text-white hover:underline"
                >
                  {footer?.list_2?.list_3?.title ||
                    "Tham gia cộng đồng E-learning"}
                </Link>
              </nav>
            </div>
          </div>

          <div className="space-y-4 text-lg text-center md:text-left">
            <h3 className="font-white text-lg border-b border-white pb-2">
              {footer?.list_3?.title || "Văn phòng tư vấn và tiếp nhận hồ sơ"}
            </h3>
            <p>{footer?.list_3?.label_1 || "HN: ..."}</p>
            <p>{footer?.list_3?.label_2 || "TP HCM: ...."}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
