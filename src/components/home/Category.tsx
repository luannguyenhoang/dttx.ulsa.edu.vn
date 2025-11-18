import { CategoryCard } from "../CategoryCard";

export const Category = (section_4: any) => {
  const categories = section_4?.section_4?.list
    ? Object.values(section_4.section_4.list) // Lấy tất cả các mục từ list
    : [];

  return (
    <>
      <div className="py-6 text-center bg-blue-900 text-4xl lg:text-4xl font-bold text-white">
        {section_4?.section_4?.title || "Các ngành đào tạo"}
      </div>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:gap-20 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {categories.map((category: any, index: number) => (
            <CategoryCard
              key={index}
              category={category?.category || "Chưa có danh mục"}
              image={category?.image || "/assets/Rectangle-5084-525x295.jpg"}
              title={category?.title || "Chưa có tiêu đề"}
              path={category?.path || "/nganh-01"}
              list_1={category?.list_1}
              list_2={category?.list_2}
              list_3={category?.list_3}
            />
          ))}
        </div>
      </div>
    </>
  );
};
