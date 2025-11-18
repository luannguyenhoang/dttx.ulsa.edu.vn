"use client";

import { FormWrapper } from "@/components/FormWrapper";
import { X } from "lucide-react";
import Image from "next/image";
import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface RegistrationPopupProps {
  trigger: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  section: any;
}

export default function RegistrationPopup({
  trigger,
  isOpen,
  onToggle,
  section
}: RegistrationPopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const renderPopup = () => {
    if (!isOpen) return null;

    return createPortal(
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <div className="bg-white mx-2 rounded-lg shadow-lg overflow-hidden max-w-3xl w-full flex relative m-4">
          <button
            onClick={onToggle}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 z-10"
          >
            <X size={20} />
          </button>
          <div className="w-1/3 hidden md:block relative">
            <div className="absolute inset-0">
              <Image
                src={section?.image || "/assets/cta.png"}
                alt="ULSA E-Learning"
                width={650}
                height={1165}
                className="object-cover w-600px"
                priority
              />
            </div>
          </div>
          <div className="p-6 ">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-red-600 text-center">
                {section?.title_popup ||
                  "ĐĂNG KÝ NHẬN TƯ VẤN VỀ CHƯƠNG TRÌNH!!"}
              </h2>
              <p className="text-sm text-gray-600 text-center mt-2">
                {section?.desc_popup ||
                  "Để lại thông tin nhận chương trình học chi tiết và giải đáp mọi thắc mắc.."}
              </p>
            </div>
            <FormWrapper type="form-main" />
          </div>
        </div>
      </div>,
      document.body
    );
  };
  return (
    <>
      <div onClick={onToggle} className="cursor-pointer">
        {trigger}
      </div>
      {typeof window !== "undefined" && renderPopup()}
    </>
  );
}
