import React from "react";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

import { Metadata } from "next";
import { IconBadge } from "@/components/IconBadge";
import { Captions, Image } from "lucide-react";
import TitleForm from "./_components/TitleForm";
import SubTitleForm from "./_components/SubTitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
export const metadata: Metadata = {
  title: "صفحة الأدمن | تعديل الصفحة الرئيسية",
  description:
    "Explore a wide range of educational and training videos focused on trading. We provide exclusive content that includes trading strategies, technical analysis, and investment opportunities. Stay updated with the latest market trends and strategies through our regularly updated videos, designed to help you achieve your financial goals effectively.  اكتشف مجموعة متنوعة من الفيديوهات التعليمية والتدريبية المتخصصة في التداول. نقدم لك محتوى مميزاً يشمل استراتيجيات التداول، التحليل الفني، والفرص الاستثمارية. تابع أحدث الاتجاهات واستراتيجيات السوق مع فيديوهاتنا المتجددة التي تساعدك على تحقيق أهدافك المالية بفعالية.",
};

const Banner = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const banner = await prisma.banner.findMany();

  if (!banner) {
    return redirect("/");
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">إعداد الصفحة الرئيسية</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Captions} />
            <h2 className="text-2xl">العنوان الأول</h2>
          </div>

          <TitleForm initialData={banner[0]} />
          <SubTitleForm initialData={banner[0]} />
          <DescriptionForm initialData={banner[0]} />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Image} />
              <h2 className="text-xl">صورة الصفحة الرئيسية</h2>
            </div>

            <ImageForm initialData={banner[0]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
