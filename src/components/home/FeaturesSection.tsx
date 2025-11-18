"use client";
import CountUp from "react-countup";

interface ICounter {
  start: number;
  end: number | string;
  suffix?: string;
  prefix?: string;
  text?: string;
}

export const Counter = (props: ICounter) => {
  const { start, end, suffix = "", prefix = "", text } = props;

  // Chuyển đổi số từ CMS, đảm bảo là Number
  const numericEnd =
    typeof end === "string" ? parseFloat(end.replace(",", ".")) : end;

  return (
    <CountUp
      enableScrollSpy={true}
      end={numericEnd}
      start={start}
      duration={2}
      suffix={prefix}
      decimals={numericEnd % 1 !== 0 ? 1 : 0}
    >
      {({ countUpRef }) => (
        <div className="flex flex-col items-center px-6">
          <div className="text-[#0C098C] text-7xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
            {text}
            <span ref={countUpRef}></span>
          </div>
          <h3 className="text-black text-2xl font-bold text-center">
            {suffix}
          </h3>
        </div>
      )}
    </CountUp>
  );
};

export const FeaturesSection = (section_1: any) => {
  const counters = [
    {
      start: 0,
      end: Number(section_1?.section_1?.list_1?.title?.replace(",", ".")) || 6,
      suffix:
        section_1?.section_1?.list_1?.description || "Ngành đào tạo từ xa",
      text: ""
    },
    {
      start: 0,
      end: Number(section_1?.section_1?.list_2?.title?.replace(",", ".")) || 99,
      suffix: section_1?.section_1?.list_2?.description || "GS - TS giảng dạy",
      text: ""
    },
    {
      start: 0,
      end:
        Number(section_1?.section_1?.list_3?.title?.replace(",", ".")) || 11000,
      suffix:
        section_1?.section_1?.list_3?.description || "Học viên đã tham gia",
      prefix: "+"
    },
    {
      start: 0,
      end:
        Number(section_1?.section_1?.list_4?.title?.replace(",", ".")) || 99.9,
      suffix:
        section_1?.section_1?.list_4?.description || "Học viên đã có bằng",
      prefix: "%"
    }
  ];

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {counters.map((counter, index) => (
            <div
              key={index}
              className={`flex justify-center ${
                index !== 0 ? "lg:border-l-2 lg:border-gray-300" : ""
              }`}
            >
              <Counter {...counter} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
