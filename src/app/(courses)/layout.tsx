import React from "react";
import { ToastProvider } from "@/components/providers/toasterProvider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import Sidebar from "./courses/_components/Sidebar";
import CourseNavbar from "./courses/_components/CourseNavbar";

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
