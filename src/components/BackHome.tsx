import { ArrowRight } from "lucide-react";
import Link from "next/link";

const BackHome = () => {
  return (
    <Link
      href={`/`}
      className="flex items-center text-sm hover:opacity-75 transition mb-6"
    >
      <ArrowRight className="h-4 w-4 ml-2" />
      العودة إلى الصفحة الرئيسية
    </Link>
  );
};

export default BackHome;
