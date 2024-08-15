import {
  Course,
  DaleyRecommendation,
  Recommendation,
  Wallet,
} from "@prisma/client";
import SubscribeCourseCard from "./SubscribeCourseCard";
import React from "react";

type CourseWithProgressWithCategory = Course & {
  chapters: { id: string }[];
};

function isCourseWithChapters(
  item: any
): item is CourseWithProgressWithCategory {
  return (item as CourseWithProgressWithCategory).chapters !== undefined;
}

interface SubscribeCourseListProps {
  items:
    | CourseWithProgressWithCategory[]
    | Recommendation[]
    | DaleyRecommendation[]
    | Wallet[];
  link: string;
}
const SubscribeCourseList = ({ items, link }: SubscribeCourseListProps) => {
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <SubscribeCourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={
              isCourseWithChapters(item) ? item.chapters.length : undefined
            }
            link={link}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          لا توجد دورات لعرضها
        </div>
      )}
    </>
  );
};

export default SubscribeCourseList;
