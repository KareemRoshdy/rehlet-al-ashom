"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

interface NavbarRoutesProps {
  isAdminPage?: boolean;
}

const NavbarRoutes = ({ isAdminPage }: NavbarRoutesProps) => {
  const { userId } = useAuth();

  const isAdmin = userId === process.env.NEXT_PUBLIC_ADMIN_ID;

  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/admin");
  const isCoursePage = pathname?.includes("/courses");
  const isRecommendationPage = pathname?.includes("/recommendations");
  const isDailyRecommendationPage = pathname?.includes(
    "/daily-recommendations"
  );
  const isWalletPage = pathname?.includes("/wallet");
  const isNewsPage = pathname?.includes("/news");
  const isSubscribePage = pathname?.includes("/subscribe");

  const shouldHideNavLinks =
    isCoursePage ||
    isRecommendationPage ||
    isWalletPage ||
    isDailyRecommendationPage ||
    isSubscribePage ||
    isNewsPage;

  return (
    <>
      {!isAdminPage && (
        <div className="hidden md:flex items-center justify-between gap-x-5 w-full">
          <Logo />

          {!shouldHideNavLinks && <NavLinks />}
        </div>
      )}

      <div className="flex gap-x-2 mr-auto">
        {isTeacherPage || shouldHideNavLinks ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 ml-2" />
              الرئيسية
            </Button>
          </Link>
        ) : (
          isAdmin && (
            <Link href="/admin/courses">
              <Button size="sm" variant="ghost">
                صفحة الأدمن
              </Button>
            </Link>
          )
        )}

        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;
