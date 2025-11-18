"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { CTAButton } from "./Btn";
import RegistrationPopup from "./RegistrationPopup";

export const CTA = () => {
  const [homeContent, setHomeContent] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=cta`, {
          next: { revalidate: 3 }
        });
        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }
        const data = await res.json();
        console.log(data);
        setHomeContent(data?.contentPage[0]);
      } catch (error) {
        console.error("Error fetching home content:", error);
      }
    };
    getHomeContent();
  }, []);

  return (
    <div className="fixed bottom-0 right-[10px] translate-y-[-152%] w-10 z-50">
      <div className="flex flex-col items-center space-y-3">
        <div className="transform rotate-90 origin-center mb-[44px]">
          <RegistrationPopup
            trigger={
              <Button className="bg-blue-500 hover:bg-blue-600 font-bold text-white shadow-md px-4 py-2 flex items-center gap-2">
                <span>{homeContent?.acf?.title || "Tư vấn ngay"}</span>
                <Mail size={18} />
              </Button>
            }
            isOpen={isOpen}
            onToggle={togglePopup}
            section={homeContent?.acf}
          />
        </div>
        <CTAButton
          type="zalo"
          link={
            homeContent?.acf?.link_zalo ||
            "https://www.messenger.com/t/581176868409743"
          }
        />
        <CTAButton
          type="phone"
          link={homeContent?.acf?.link_dt || "tel:094.221.4466"}
        />
      </div>
    </div>
  );
};
