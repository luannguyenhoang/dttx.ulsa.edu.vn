"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const FAQ = (section_1: any) => {
  const faqs = [
    {
      question:
        section_1?.section_1?.list_a?.list_1?.title ||
        "Bằng Đại học từ xa có giá trị không?",
      answer:
        section_1?.section_1?.list_a?.list_1?.description ||
        "Bằng đại học trực tuyến (hay bằng đại học từ xa) sẽ có giá trị tương đương so với bằng tương ứng với mỗi một chuyên ngành khi học trực tiếp trên trường."
    },
    {
      question:
        section_1?.section_1?.list_a?.list_2?.title ||
        "Bằng Đại học từ xa có thể sử dụng để học lên bậc cao hơn không?",
      answer:
        section_1?.section_1?.list_a?.list_2?.description ||
        "Có, bạn có thể sử dụng bằng đại học từ xa để tiếp tục học lên cao hơn nếu đáp ứng các điều kiện của chương trình học."
    },
    {
      question:
        section_1?.section_1?.list_a?.list_3?.title ||
        "Hình thức học đại học từ xa là như thế nào?",
      answer:
        section_1?.section_1?.list_a?.list_3?.description ||
        "Học từ xa cho phép bạn học qua các nền tảng trực tuyến mà không cần đến trường, với giáo trình và hỗ trợ từ giảng viên."
    },
    {
      question:
        section_1?.section_1?.list_a?.list_4?.title ||
        "Đại học từ xa có cần phải đến trường thi không?",
      answer:
        section_1?.section_1?.list_a?.list_4?.description ||
        "Một số chương trình yêu cầu thi trực tiếp tại trường, nhưng phần lớn có thể thi trực tuyến hoặc tại các trung tâm được ủy quyền."
    }
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6">FAQ</h2>
      <div className="border-t-2 border-[#1e3a8a] w-16 mb-6"></div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-[#1e3a8a] rounded-md">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-[#1e3a8a] font-semibold text-left text-3xl"
            >
              <span>
                {index + 1}. {faq.question}
              </span>
              {openIndex === index ? (
                <FaChevronUp className="text-[#1e3a8a]" />
              ) : (
                <FaChevronDown className="text-[#1e3a8a]" />
              )}
            </button>
            {openIndex === index && (
              <div className="p-4 text-[#1657A7] border-t border-[#1e3a8a] text-xl whitespace-pre-line">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
