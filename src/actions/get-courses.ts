import { Course } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import prisma from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId?: string;
  title?: string;
};

export const getCourses = async ({
  userId,
  title,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchases.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }

          const progressPercentage = await getProgress(
            userId as string,
            course.id
          );

          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
