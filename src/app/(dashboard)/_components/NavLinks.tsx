"use client";
import Link from "next/link";
import { useState } from "react";

const NavLinks = () => {
  const [active, setActive] = useState("#home");

  const links = [
    {
      label: "الرئيسية",
      href: "#home",
    },
    {
      label: "أهم الاخبار",
      href: "#news",
    },
    {
      label: "التوصيات اللحظية",
      href: "#Recommendations",
    },
    {
      label: "التوصيات اليوميه",
      href: "#dailyRecommendations",
    },
    {
      label: "إدارة المحافظ",
      href: "#wallet",
    },
    {
      label: "الدورات",
      href: "/courses",
    },
  ];

  return (
    <nav className="hidden m-auto md:flex items-center gap-x-[40px]">
      {links.map((link) => (
        <>
          <Link
            className={`text-gray-500 transition hover:text-[#0369a1] ${
              active === link.href && "text-[#0369a1]"
            }`}
            href={link.href}
            key={link.href}
            onClick={() => setActive(link.href)}
          >
            {link.label}
          </Link>
        </>
      ))}
    </nav>
  );
};

export default NavLinks;