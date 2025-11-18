import Image from "next/image";
import Link from "next/link";

export const Logo = ({ logo }: { logo: string }) => {
  return (
    <Link href="/">
      <Image
        src={logo || "/assets/a.png"}
        width={270}
        height={80}
        alt="Logo"
        priority
        className="h-12 w-auto"
      />
    </Link>
  );
};
