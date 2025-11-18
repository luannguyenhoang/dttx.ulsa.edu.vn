import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title?: string;
  icon?: string;
}

const Card: React.FC<Props> = ({ children, title, icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 flex flex-col items-center text-center">
      <div className="text-yellow-500 text-3xl mb-4">{icon}</div>
      <div className="text-blue-900 text-sm leading-relaxed">{children}</div>
      <div className="mt-6 w-full bg-blue-200 h-3 rounded"></div>
      <p className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold  transition">
        {title}{" "}
      </p>
    </div>
  );
};

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="flex flex-col items-center p-8 bg-white">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
        {title ||
          "Tại sao nên học Ngôn ngữ Anh - Trường Đại học Lao động - Xã hội"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {children}
      </div>
    </div>
  );
};

export { Card, Layout };
