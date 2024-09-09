"use client";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { GrYoutube } from "react-icons/gr";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiLogoTelegram } from "react-icons/bi";

const Footer = () => {
  const pathname = usePathname();

  const isCoursePage = pathname?.includes("/courses");

  const socialMediaLinks = [
    {
      icon: GrYoutube,
      link: "https://youtube.com/@mahmoudabdelwhab777?si=uW5J6qGNRAT954wv",
      label: "youtube",
    },
    {
      icon: BiLogoTelegram,
      link: "https://t.me/+201095261572",
      label: "telegram",
    },
    {
      icon: IoLogoWhatsapp,
      link: "https://wa.me/201095261572",
      label: "whatsapp",
    },

    {
      icon: GrYoutube,
      link: "https://youtube.com/channel/UCA4fg0OQol3DgxPHhqYvNYQ?si=lqL_83AI1wNbMTxO",
      label: "youtube",
    },
  ];
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-teal-600">
          <Logo />
        </div>

        <p className="hidden md:block mx-auto my-6 max-w-md text-center leading-relaxed text-gray-500">
          موقعنا يوفر لك أدوات ومعلومات شاملة حول التداول والأسواق المالية. نحن
          نقدم تحليلات دقيقة وتوصيات موثوقة لمساعدتك في اتخاذ قرارات استثمارية
          أفضل.
        </p>

        {!isCoursePage && (
          <div className="hidden md:flex">
            <NavLinks />
          </div>
        )}

        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          {socialMediaLinks.map((link) => (
            <li key={link.link}>
              <a
                href={link.link}
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:text-gray-700/75"
              >
                <span className="sr-only">{link.label}</span>
                <link.icon className="w-5 h-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
