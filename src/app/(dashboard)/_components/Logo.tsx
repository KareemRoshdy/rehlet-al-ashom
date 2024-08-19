import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={`/`} className="w-[160px] h-[80px] overflow-hidden">
      <Image
        width={160}
        height={160}
        className="w-full h-full object-cover"
        src="/logo.png"
        alt="logo"
      />
    </Link>
  );
};

export default Logo;
