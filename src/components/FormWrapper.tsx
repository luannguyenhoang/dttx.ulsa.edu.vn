/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { FormGetFly } from "./FormGetFly";
import { FormSam } from "./FormSam";
import { FormGoogle } from "./FormGoogle";

interface FormData {
  type: "form-getfly" | "form-sam" | "form-google" | "unknown";
  url: string;
  uuid: string;
  divId: string;
  divClass: string;
}

export const FormWrapper = ({
  title,
  color
}: {
  title?: string;
  color?: string;
  type?: "form-main" | "form-poup";
}) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFormData = async () => {
      const key = `form-data-form-main`;
      const cacheExpireMs = 1000 * 60 * 60 * 6; // 6 tiếng

      try {
        const cached = localStorage.getItem(key);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.expires > Date.now()) {
            setFormData(parsed.data);
            setIsLoading(false);
            return;
          } else {
            localStorage.removeItem(key); // Xoá cache hết hạn
          }
        }

        // Gọi API nếu không có cache
        const res = await fetch(`/api/gen-form/?type=form-main`);
        if (!res.ok) {
          throw new Error(`Form fetch failed: ${res.statusText}`);
        }
        const data = await res.json();
        setFormData(data);

        // Lưu vào localStorage
        localStorage.setItem(
          key,
          JSON.stringify({
            data,
            expires: Date.now() + cacheExpireMs
          })
        );
      } catch (error) {
        console.error("Error fetching form data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[38vh] w-full animate-pulse bg-gray-200 rounded-md" />
    );
  }

  if (!formData) {
    return <h1 color="red.500">Unable to load form</h1>;
  }

  return (
    <>
      {title && (
        <h2 className={`text-lg text-center text-[${color}] py-2`}>{title}</h2>
      )}
      {formData.type === "form-getfly" && <FormGetFly {...formData} />}
      {formData.type === "form-sam" && <FormSam {...formData} />}
      {formData.type === "form-google" && (
        <FormGoogle url={formData.url} divId={formData.divId} />
      )}
    </>
  );
};
