"use client";
import { useState } from "react";
import Link from "next/link";
import { GrFacebookOption, GrYoutube } from "react-icons/gr";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiMessageRounded, BiX, BiLinkAlt } from "react-icons/bi"; // Icon for the main contact button

const SocialMedia = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle icons visibility

  const socialMediaLinks = [
    {
      icon: GrFacebookOption,
      link: "#",
      label: "facebook",
    },
    {
      icon: IoLogoWhatsapp,
      link: "#",
      label: "whatsapp",
    },
    {
      icon: GrYoutube,
      link: "#",
      label: "youtube",
    },
  ];

  return (
    <div className="fixed left-4 md:left-5 bottom-4 z-10 flex flex-col-reverse items-center space-y-3 space-y-reverse">
      {/* Floating Contact Button */}
      <button
        style={{
          clipPath:
            "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)",
        }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#0369a1] text-white p-3 shadow-xl hover:bg-[#025b8b] transition overflow-hidden flex items-center justify-center"
      >
        {isOpen ? (
          <BiX className="w-6 h-6" />
        ) : (
          <BiLinkAlt className="w-6 h-6" />
        )}
      </button>

      {/* Social Media Icons */}
      <div
        className={`flex flex-col items-center space-y-3 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {socialMediaLinks.map((link) => (
          <Link
            href={link.link}
            key={link.link}
            className={`bg-white p-3 rounded-full flex items-center justify-center shadow-xl transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-y-0 scale-100" : "translate-y-4 scale-75"
            } 
            ${link.label === "facebook" && "text-[#1877F2]"} 
            ${link.label === "whatsapp" && "text-[#25D366]"} 
            ${link.label === "youtube" && "text-[#FF0000]"} 
            `}
          >
            <link.icon className="w-5 h-5" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;
