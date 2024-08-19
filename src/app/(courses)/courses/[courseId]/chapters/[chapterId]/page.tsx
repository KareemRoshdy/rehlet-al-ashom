import Banner from "@/components/banner";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CourseEnrollButton from "./_components/CourseEnrollButton";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import prisma from "@/lib/db";
import { getChapter } from "@/actions/get-chapter";
import VideoPlayer from "./_components/VideoPlayer";
import { CheckCheck } from "lucide-react";
import CourseImageAndDescription from "./_components/CourseImageAndDescription";
import { firstStep } from "@/utils/paymobToken";

interface CourseDetailsPageProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}

const CourseDetailsPage = async ({
  params: { courseId, chapterId },
}: CourseDetailsPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const getCourse = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!getCourse) {
    return redirect("/");
  }

  const { chapter, course, muxData, nextChapter, userProgress, purchase } =
    await getChapter({
      userId,
      chapterId: chapterId,
      courseId: courseId,
    });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  const token = await firstStep(course.price || 0);

  return (
    <div className="chapter">
      {purchase && (
        <Banner variant="success" label="أنت مشترك في هذه الدورة بالفعل" />
      )}

      {!purchase && (
        <Banner variant="warning" label="أنت غير مشترك في هذه الدورة!" />
      )}

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={chapter.id}
            title={chapter.title}
            courseId={courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>

        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>

            {purchase ? (
              <p className="flex items-center gap-x-2 text-xl font-semibold text-green-600">
                <CheckCheck />
                تم الإشتراك
              </p>
            ) : (
              <CourseEnrollButton
                courseId={courseId}
                price={course.price!}
                token={token}
                chapterId={chapter.id!}
              />
            )}
          </div>

          <Separator />

          <div>
            <Preview value={chapter.description!} />
          </div>

          <div>
            <CourseImageAndDescription
              title={getCourse.title}
              imageUrl={getCourse.imageUrl!}
              description={getCourse.description!}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
