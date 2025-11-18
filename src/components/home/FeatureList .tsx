import { FcOnlineSupport, FcOvertime } from "react-icons/fc";
import { GrCertificate } from "react-icons/gr";
import { HiOutlineBookOpen } from "react-icons/hi2";
export const FeatureList = (section_3: any) => {
  const featureItems = [
    {
      id: 1,
      icon: <FcOvertime className="h-10 w-10" />,
      title: section_3?.section_3?.list_1?.title || "Thời gian đào tạo",
      description:
        section_3?.section_3?.list_1?.description ||
        "Thời gian học chỉ từ 2-2.5 năm"
    },
    {
      id: 2,
      icon: <HiOutlineBookOpen className="h-10 w-10" />,
      title: section_3?.section_3?.list_2?.title || "Bằng cấp",
      description:
        section_3?.section_3?.list_2?.description ||
        "Thời gian học chỉ từ 2-2.5 năm"
    },
    {
      id: 3,
      icon: <FcOnlineSupport className="h-10 w-10" />,
      title: section_3?.section_3?.list_3?.title || "Bằng cấp 134",
      description:
        section_3?.section_3?.list_3?.description ||
        "Thời gian học chỉ từ 2-2.5 năm"
    },
    {
      id: 4,
      icon: <GrCertificate className="h-10 w-10" />,
      title: section_3?.section_3?.list_4?.title || "Bằng cấp 78",
      description:
        section_3?.section_3?.list_4?.description ||
        "Thời gian học chỉ từ 2-2.5 năm"
    }
  ];

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {featureItems.map((item) => (
        <div
          key={item.id}
          className="border-2 border-blue-500 px-5 py-4 bg-slate-100"
        >
          <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center">
            {item.icon}
          </div>
          <div className="font-bold text-xl mt-4 text-blue-800">
            {item.title}
          </div>
          <div className="mt-2 pb-6 text-blue-800">{item.description}</div>
        </div>
      ))}
    </div>
  );
};
