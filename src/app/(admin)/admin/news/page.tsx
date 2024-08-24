import { redirect } from "next/navigation";
import prisma from "@/lib/db";

import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs/server";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "صفحة الأدمن | أهم الأخبار  ",
  description:
    "Explore a wide range of educational and training videos focused on trading. We provide exclusive content that includes trading strategies, technical analysis, and investment opportunities. Stay updated with the latest market trends and strategies through our regularly updated videos, designed to help you achieve your financial goals effectively.  اكتشف مجموعة متنوعة من الفيديوهات التعليمية والتدريبية المتخصصة في التداول. نقدم لك محتوى مميزاً يشمل استراتيجيات التداول، التحليل الفني، والفرص الاستثمارية. تابع أحدث الاتجاهات واستراتيجيات السوق مع فيديوهاتنا المتجددة التي تساعدك على تحقيق أهدافك المالية بفعالية.",
};

const NewsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const news = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={news} />
    </div>
  );
};

export default NewsPage;
