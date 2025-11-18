import Image from "next/image";
import { useModal } from "../layout/ModalContext";

export const WorldClassLearning = (section_5: any) => {
  const { openModal } = useModal();
  return (
    <div className="bg-blue-900">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hình ảnh */}
          <div className="flex justify-center">
            <Image
              src={
                section_5?.section_5?.list_2?.image ||
                "/assets/image_h2-768x513.jpg"
              }
              width={600}
              height={600}
              alt="worldclasslearning"
              className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Nội dung */}
          <div className="space-y-4 text-white text-center px-4 md:px-8">
            <div className="text-3xl md:text-4xl font-semibold">
              {section_5?.section_5?.list_1?.title_1 || "Bằng tốt nghiệp"}
            </div>
            <div className="text-[12px] md:text-xl font-bold uppercase leading-snug">
              {section_5?.section_5?.list_1?.title_2 ||
                "Văn bằng có giá trị tương đương hệ chính quy"}
            </div>
            <div className="text-lg md:text-xl whitespace-pre-line break-words">
              {section_5?.section_5?.list_1?.description ||
                `Tốt nghiệp cấp bằng CỬ NHÂN. Bằng không ghi hình thức đào tạo. Được Bộ GD&DT công nhận và có giá trị vĩnh viễn.`}
            </div>

            <div>
              <button
                onClick={() => openModal()}
                className="text-lg md:text-2xl font-bold uppercase px-4 md:px-6 bg-white text-blue-900 py-2 rounded-md shadow-md hover:bg-gray-200 transition"
              >
                Nhận tài khoản học thử
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
