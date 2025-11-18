import Image from "next/image";
import Link from "next/link";

export const CTAButton = ({ type, link }: { type: string; link: string }) => {
  const isZalo = type === "zalo";

  return (
    <Link href={link} passHref>
      <div
        className={`inline-flex items-center justify-center rounded-full p-2 text-white w-[45px] h-[45px] ${
          isZalo ? "bg-blue-500" : "bg-red-500"
        }`}
      >
        <Image
          src={
            isZalo
              ? "/assets/1zda-20231121163027-6jjlm.png"
              : "/assets/Icon/phone.png"
          }
          alt={isZalo ? "Zalo Icon" : "Phone Icon"}
          width={30}
          height={30}
        />
      </div>
    </Link>
  );
};
