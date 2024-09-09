"use client";
import { useState } from "react";
import Link from "next/link";
import { GrYoutube } from "react-icons/gr";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiLogoTelegram } from "react-icons/bi"; // Icon for the main contact button

const SocialMedia = () => {
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
    <div className="fixed left-4 md:left-5 top-[50%] z-10 flex flex-col-reverse items-center space-y-3 space-y-reverse">
      {/* Social Media Icons */}
      <div
        className={`flex flex-col items-center space-y-3 transition-all duration-300 ease-in-out `}
      >
        {socialMediaLinks.map((link) => (
          <Link
            href={link.link}
            key={link.link}
            target="_blank"
            className={`bg-white p-3 rounded-full flex items-center justify-center shadow-xl transform transition-transform duration-300 ease-in-out 
            
            ${link.label === "telegram" && "text-[#0088cc]"} 
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
