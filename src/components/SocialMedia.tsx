import Link from "next/link";
import { GrFacebookOption, GrYoutube } from "react-icons/gr";
import { IoLogoWhatsapp } from "react-icons/io";

const SocialMedia = () => {
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
    <div className="fixed left-[-10px] md:left-4 top-[50%] translate-x-[50%] z-10">
      {socialMediaLinks.map((link) => (
        <Link
          href={link.link}
          key={link.link}
          className={`bg-white p-2 mb-2 rounded-md flex items-center justify-center shadow-xl ${
            link.label === "facebook" && "text-[#1877F2]"
          } 
          ${link.label === "whatsapp" && "text-[#25D366]"} 
          ${link.label === "youtube" && "text-[#FF0000]"} 
          `}
        >
          <link.icon className="w-5 h-5" />
        </Link>
      ))}
    </div>
  );
};

export default SocialMedia;
