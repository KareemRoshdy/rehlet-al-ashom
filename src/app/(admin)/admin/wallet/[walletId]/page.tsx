import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/IconBadge";
import { CircleDollarSign, LayoutDashboard } from "lucide-react";
import TitleForm from "./_components/TitleForm";
import ImageForm from "./_components/ImageForm";
import PriceForm from "./_components/PriceForm";
import Banner from "@/components/banner";
import DescriptionForm from "./_components/DescriptionForm";
import WalletActions from "./_components/WalletActions";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "إدارة المحافظ",
  description:
    "Explore a wide range of educational and training videos focused on trading. We provide exclusive content that includes trading strategies, technical analysis, and investment opportunities. Stay updated with the latest market trends and strategies through our regularly updated videos, designed to help you achieve your financial goals effectively.  اكتشف مجموعة متنوعة من الفيديوهات التعليمية والتدريبية المتخصصة في التداول. نقدم لك محتوى مميزاً يشمل استراتيجيات التداول، التحليل الفني، والفرص الاستثمارية. تابع أحدث الاتجاهات واستراتيجيات السوق مع فيديوهاتنا المتجددة التي تساعدك على تحقيق أهدافك المالية بفعالية.",
};

interface WalletPageProps {
  params: { walletId: string };
}

const WalletPage = async ({ params: { walletId } }: WalletPageProps) => {
  const wallet = await prisma.wallet.findUnique({
    where: {
      id: walletId,
    },
  });

  if (!wallet) {
    return redirect("/");
  }

  const requiredFields = [
    wallet.title,
    wallet.description,
    wallet.imageUrl,
    wallet.price,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!wallet.isPublished && (
        <Banner
          variant="warning"
          label="هذه المحفطة غير منشورة. لن تكون مرئية للمستخدمين"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">إعداد المحفطة</h1>
            <span className="text-sm text-slate-700">
              إملاء جميع الحقول {completionText}
            </span>
          </div>

          {/* Add Actions */}
          <WalletActions
            disabled={!isComplete}
            walletId={walletId}
            isPublished={wallet.isPublished ?? false}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-2xl">قم بتخصيص محفظتك</h2>
            </div>

            <TitleForm initialData={wallet} walletId={wallet.id} />
            <DescriptionForm initialData={wallet} walletId={wallet.id} />
            <ImageForm initialData={wallet} walletId={wallet.id} />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">بيع محفظتك</h2>
              </div>

              <PriceForm initialData={wallet} walletId={wallet.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletPage;
