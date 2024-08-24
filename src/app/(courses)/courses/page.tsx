import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CoursesList from "@/components/CoursesList";

import { Metadata } from "next";
import SearchInput from "@/components/SearchInput";
export const metadata: Metadata = {
  title: "الدورات",
  description: `Explore a wide range of educational and training videos focused on trading. 
  We provide exclusive content that includes trading strategies, technical analysis, and investment opportunities. 
  Stay updated with the latest market trends and strategies through our regularly updated videos, 
  designed to help you achieve your financial goals effectively. 
  اكتشف مجموعة متنوعة من الفيديوهات التعليمية والتدريبية المتخصصة في التداول. 
  نقدم لك محتوى مميزاً يشمل استراتيجيات التداول، التحليل الفني، والفرص الاستثمارية. 
  تابع أحدث الاتجاهات واستراتيجيات السوق مع فيديوهاتنا المتجددة التي تساعدك على تحقيق أهدافك المالية بفعالية.`,
};

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const CoursesPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const courses = await getCourses({
    userId,
    ...searchParams,
  });
  return (
    <div className="fix-h">
      <div className="px-6 pt-6 md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <CoursesList items={courses} />
      </div>
    </div>
  );
};

export default CoursesPage;
