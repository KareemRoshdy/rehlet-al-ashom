import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface BackLinkProps {
  link: string;
  label: string;
}

const BackLink = ({ link, label }: BackLinkProps) => {
  return (
    <Link
      href={link}
      className="flex items-center text-sm hover:opacity-75 transition mb-6"
    >
      <ArrowRight className="h-4 w-4 ml-2" />
      {label}
    </Link>
  );
};

export default BackLink;
