import React from "react";
import { ToastProvider } from "@/components/providers/toasterProvider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import Sidebar from "./courses/_components/Sidebar";
import CourseNavbar from "./courses/_components/CourseNavbar";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "الدورات",
  description:
    "Explore a wide range of educational and training videos focused on trading. We provide exclusive content that includes trading strategies, technical analysis, and investment opportunities. Stay updated with the latest market trends and strategies through our regularly updated videos, designed to help you achieve your financial goals effectively.  اكتشف مجموعة متنوعة من الفيديوهات التعليمية والتدريبية المتخصصة في التداول. نقدم لك محتوى مميزاً يشمل استراتيجيات التداول، التحليل الفني، والفرص الاستثمارية. تابع أحدث الاتجاهات واستراتيجيات السوق مع فيديوهاتنا المتجددة التي تساعدك على تحقيق أهدافك المالية بفعالية.",
};

const CoursesLayout: any = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-full">
        <ConfettiProvider />
        <ToastProvider />
        <div className="h-[80px] md:pr-56 fixed inset-y-0 w-full z-50">
          <CourseNavbar />
        </div>

        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>

        <main className="md:pr-56 pt-[80px] h-full">{children}</main>
      </div>
    </>
  );
};

export default CoursesLayout;
