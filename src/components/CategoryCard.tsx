import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  category: string;
  image: string;
  title: string;
  path: string;
  list_1: string;
  list_2: string;
  list_3: string;
}

export const CategoryCard = ({
  category,
  image,
  title,
  path,
  list_1,
  list_2,
  list_3
}: CategoryCardProps) => {
  return (
    <Link href={path} passHref>
      <Card className="overflow-hidden group cursor-pointer">
        <div className="relative">
          <Image
            src={image}
            alt={title}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-4 space-y-3 text-blue-800 ">
          <h3 className="font-bold text-xl text-center pb-2  group-hover:text-[#6366F1] transition-colors">
            {title}
          </h3>
          <div className="space-y-2 pb-4">
            <div>{list_1 || "Yêu cầu: Tốt nghiệp THPT trở lên"}</div>
            <div>{list_2 || "Thời gian đào tạo: 2,5 - 4 năm"}</div>
            <div>{list_3 || "Cấp bằng: Cử nhân "}</div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
