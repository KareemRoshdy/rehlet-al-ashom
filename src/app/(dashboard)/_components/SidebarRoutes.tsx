"use client";

import {
  BarChart,
  Bell,
  CalendarCheck,
  Layout,
  List,
  Newspaper,
  Wallet,
} from "lucide-react";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";

const guestRoutes = [
  {
    icon: Layout,
    label: "الرئيسية",
    href: "#home",
  },
  {
    icon: Newspaper,
    label: "أهم الاخبار",
    href: "#news",
  },
  {
    icon: Bell,
    label: "التوصيات اللحظية",
    href: "#Recommendations",
  },
  {
    icon: CalendarCheck,
    label: "التوصيات اليوميه",
    href: "#dailyRecommendations",
  },
  {
    icon: Wallet,
    label: "إدارة المحافظ",
    href: "#wallet",
  },
  {
    icon: List,
    label: "الدورات",
    href: "/courses",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "الدورات",
    href: "/admin/courses",
  },
  {
    icon: Bell,
    label: "التوصيات اللحظية",
    href: "/admin/recommendations",
  },
  {
    icon: CalendarCheck,
    label: "التوصيات اليومية",
    href: "/admin/daily-recommendations",
  },
  {
    icon: Newspaper,
    label: "اهم الأخبار",
    href: "/admin/news",
  },
  {
    icon: Wallet,
    label: "إدارة المحافظ",
    href: "/admin/wallet",
  },
  {
    icon: BarChart,
    label: "الإحصائيات",
    href: "/admin/analytics",
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/admin");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

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

export default SidebarRoutes;