import Image from "next/image";
import { FormWrapper } from "../FormWrapper";

export const RegistrationForm = (section_1: any) => {
  return (
    <div className=" relative md:h-[650px]">
      <div className="absolute inset-0 z-0">
        <Image
          src={
            section_1?.section_1?.background_image ||
            "/assets/bg-gioi-thieu-1-1.jpg"
          }
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10  p-4 md:p-8">
        <div className="container max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-blue-600/95 p-6 rounded-lg shadow-xl backdrop-blur-sm">
            <h2 className="text-white text-2xl font-bold mb-8 text-center uppercase whitespace-pre-line">
              {section_1?.section_1?.title_form ||
                `Đăng ký nhận thông tin
                            chương trình học`}
            </h2>
            <FormWrapper type="form-main" />
          </div>
          <div className="text-white space-y-6 bg-black/30 p-8 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-32 h-32">
                <Image
                  src="/assets/logo.png"
                  alt="ULSA Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="space-y-4 text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider">
                {section_1?.section_1?.title_1 || "Chương trình đào tạo từ xa"}
              </h1>
              <div className="border-t-4 border-white w-3/4 mx-auto my-2"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-red-500 uppercase">
                {section_1?.section_1?.title_2 ||
                  "Trường đại học lao động - xã hội"}
              </h2>
              <div className="space-y-4 text-xl md:text-2xl font-semibold mt-8">
                <p className="bg-white/10 py-2 px-4 rounded-lg backdrop-blur-sm">
                  {" "}
                  {section_1?.section_1?.label_1 || "Học online 100%"}
                </p>
                <p className="bg-white/10 py-2 px-4 rounded-lg backdrop-blur-sm">
                  {section_1?.section_1?.label_2 ||
                    "Thời gian đào tạo 2 - 4 năm"}
                </p>
                <p className="bg-white/10 py-2 px-4 rounded-lg backdrop-blur-sm">
                  {section_1?.section_1?.label_3 ||
                    "Bằng tương đương hệ chính quy"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
