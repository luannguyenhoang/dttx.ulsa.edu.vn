"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";

const MENU_ITEMS = [
  { href: "/", label: "Trang chủ" },
  { href: "/lich-khai-giang", label: "Lịch khai giảng" },
  {
    href: "/nganh-dao-tao",
    label: "Ngành đào tạo",
    subMenu: [
      { title: "Công tác xã hội", path: "/nganh-cong-tac-xa-hoi" },
      { title: "Luật kinh tế ", path: "/nganh-luat-kinh-te" },
      { title: "Ngôn ngữ Anh ", path: "/nganh-ngon-ngu-anh" }
    ]
  },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/dang-ky", label: "Đăng ký" }
];

const EXTRA_MENU_ITEMS = [
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/lien-he", label: "Liên hệ" }
];

export const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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
  const header = homeContent?.acf.header;
  return (
    <header className="w-full bg-[#fff] sticky top-0 shadow-md z-50 text-white">
      <div className="hidden md:block bg-[#1657A7] py-2">
        <div className="container max-w-6xl  flex justify-end items-center mx-auto gap-[168px]">
          <div className="flex items-center text-xl space-x-6">
            {EXTRA_MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[17px] hover:text-blue-200 ${pathname === item.href ? "text-red-500" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-6 pl-6">
            <a
              href={header?.list_1?.link || "tel:0942214466"}
              className="flex items-center space-x-2 hover:text-blue-200"
            >
              <Phone className="h-4 w-4" />
              <span>{header?.list_1?.phone || "094.221.4466"}</span>
            </a>
            <a
              href={header?.list_2?.link || "mailto:dttx@ulsa.edu.vn"}
              className="flex items-center space-x-2 hover:text-blue-200"
            >
              <Mail className="h-4 w-4" />
              <span>{header?.list_2?.phone || "dttx@ulsa.edu.vn"}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto text-blue-700">
        <div className="flex items-center justify-between ">
          <Link href="/" className="flex-shrink-0">
            <div className="bg-[#1657A7] px-4 py-2 flex items-center">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={80}
                height={80}
                className="h-24 w-auto"
              />
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {MENU_ITEMS.map((item, index) => (
              <div key={index} className="relative group">
                <Link
                  href={item.href}
                  className={`font-bold text-xl hover:text-blue-700 ${pathname === item.href ? "text-blue-500 border-b-2 border-blue-500" : "text-[#1657A7]"}`}
                >
                  {item.label}
                </Link>
                {item.subMenu && (
                  <>
                    <ChevronDown className="inline h-6 w-5 ml-2" />
                    <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.subMenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          className="block w-40 px-4 py-2 hover:bg-blue-100 text-blue-700"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </nav>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              {MENU_ITEMS.map((item) => (
                <div key={item.href}>
                  <div
                    className="flex items-center justify-between px-4 cursor-pointer"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.href ? null : item.href
                      )
                    }
                  >
                    <Link
                      href={item.href}
                      className={`text-[#1657A7] hover:text-blue-200 ${pathname === item.href ? "text-red-500 border-l-4 border-red-500" : ""}`}
                    >
                      {item.label}
                    </Link>
                    {item.subMenu && <ChevronDown className="h-5 w-5" />}
                  </div>
                  {item.subMenu && openDropdown === item.href && (
                    <div className="pl-6 space-y-2">
                      {item.subMenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          className="block text-[#1657A7] hover:text-blue-500 px-4"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
