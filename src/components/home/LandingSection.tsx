import { FaAward } from "react-icons/fa";
import { FeatureList } from "./FeatureList ";
import { FormWrapper } from "../FormWrapper";

export const LandingSection = (section_2: any) => {
  const enrollmentItems = [
    { id: 1, title: section_2?.section_2?.list?.list_1 || "Tuyển sinh 123" },
    { id: 2, title: section_2?.section_2?.list?.list_2 || "Tuyển sinh 456" },
    { id: 3, title: section_2?.section_2?.list?.list_3 || "Tuyển sinh 678" }
  ];

  return (
    <div className="container max-w-7xl mx-auto py-12 px-4">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="space-y-8">
          <FormWrapper type="form-main" />
        </div>
        <div className="space-y-12 lg:col-span-2 ">
          <div className="pb-4">
            <div className="text-4xl font-bold">
              {section_2?.section_2?.title_1 || ".TUYỂN SINH ĐẠI HỌC TỪ XA"}
            </div>
            <div className="inline-block border-b-2 border-black mt-7">
              <div className="text-4xl font-bold text-blue-800 pb-5">
                {section_2?.section_2?.title_2 ||
                  ".TRƯỜNG ĐẠI HỌC LAO ĐỘNG - XÃ HỘI"}
              </div>
            </div>
          </div>

          <div className="space-y-7">
            {enrollmentItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-6">
                <FaAward className="h-8 w-8 text-blue-800" />
                <div className="text-xl font-bold">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
