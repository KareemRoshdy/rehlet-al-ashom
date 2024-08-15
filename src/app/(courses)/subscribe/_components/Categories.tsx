"use client";

import {
  FcList,
  FcElectricalThreshold,
  FcCalendar,
  FcMoneyTransfer,
} from "react-icons/fc";

import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Course,
  DaleyRecommendation,
  Recommendation,
  Wallet,
} from "@prisma/client";
import SubscribeCourseList from "./SubscribeCourseList";

interface CategoriesProps {
  courses: Course[];
  recommendations: Recommendation[];
  dailyRecommendations: DaleyRecommendation[];
  wallet: Wallet[];
}

const Categories = ({
  courses,
  recommendations,
  dailyRecommendations,
  wallet,
}: CategoriesProps) => {
  const [isSelected, setIsSelected] = useState(1);

  const categories = [
    {
      id: 1,
      label: "الدورات",
      icon: FcList,
    },
    {
      id: 2,
      label: "التوصيات اللحظية",
      icon: FcElectricalThreshold,
    },
    {
      id: 3,
      label: "التوصيات اليوميه",
      icon: FcCalendar,
    },
    {
      id: 4,
      label: "إدارة المحافظ",
      icon: FcMoneyTransfer,
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-x-2 overflow-x-auto pb-2 mb-5">
        {categories.map((category) => (
          <button
            onClick={() => setIsSelected(category.id)}
            key={category.label}
            className={cn(
              "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
              isSelected === category.id &&
                "border-sky-700 bg-sky-200/20 text-sky-800"
            )}
          >
            {category.icon && <category.icon />}

            <div className="truncate">{category.label}</div>
          </button>
        ))}
      </div>

      {isSelected === 1 && (
        <div>
          <SubscribeCourseList items={courses} link="courses" />
        </div>
      )}

      {isSelected === 2 && (
        <div>
          <SubscribeCourseList items={recommendations} link="recommendations" />
        </div>
      )}

      {isSelected === 3 && (
        <div>
          <SubscribeCourseList
            items={dailyRecommendations}
            link="daily-recommendations"
          />
        </div>
      )}

      {isSelected === 4 && (
        <div>
          <SubscribeCourseList items={wallet} link="wallet" />
        </div>
      )}
    </div>
  );
};

export default Categories;
