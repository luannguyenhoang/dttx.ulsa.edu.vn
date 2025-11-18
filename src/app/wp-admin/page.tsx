"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ADMIN_URL =
  process.env.NEXT_PUBLIC_ADMIN_URL || "https://admintuxa.ulsa.vn/wp-admin";

export default function WpAdminPage() {
  const router = useRouter();

  useEffect(() => {
    window.location.href = ADMIN_URL;
  }, []);

  return null;
}
