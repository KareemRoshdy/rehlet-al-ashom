"use client";

import SidebarItem from "@/app/(dashboard)/_components/SidebarItem";
import { List, BellRing } from "lucide-react";

const guestRoutes = [
  {
    icon: List,
    label: "الدورات",
    href: "/courses",
  },
  {
    icon: BellRing,
    label: "الإشتراكات",
    href: "/subscribe",
  },
];

const CourseSidebarRoutes = () => {
  const routes = guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          href={route.href}
          icon={route.icon}
          label={route.label}
        />
      ))}
    </div>
  );
};

export default CourseSidebarRoutes;
