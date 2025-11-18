import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const BlogHeader = () => {
  return (
    <div className="relative bg-[#F8F7FF] overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 py-16 relative z-10">
        <nav className="flex items-center gap-2 text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#5925DC] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800">Blog Right Sidebar</span>
        </nav>

        <div className="max-w-2xl">
          <h1 className="text-[#0A0B2C] text-5xl font-bold mb-4">
            Blog Right Sidebar
          </h1>
          <p className="text-gray-500 text-lg">
            Inspiring discovery through creativity.
          </p>
        </div>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M160 320C248.366 320 320 248.366 320 160C320 71.6344 248.366 0 160 0"
            stroke="#FFE5D4"
            strokeWidth="2"
          />
          <path
            d="M160 280C226.274 280 280 226.274 280 160C280 93.7258 226.274 40 160 40"
            stroke="#FFE5D4"
            strokeWidth="2"
          />
          <path
            d="M160 240C204.183 240 240 204.183 240 160C240 115.817 204.183 80 160 80"
            stroke="#FFE5D4"
            strokeWidth="2"
          />
          <path
            d="M160 200C182.091 200 200 182.091 200 160C200 137.909 182.091 120 160 120"
            stroke="#FFE5D4"
            strokeWidth="2"
          />
          <path
            d="M160 160C160 160 160 160 160 160C160 160 160 160 160 160"
            stroke="#FFE5D4"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};
