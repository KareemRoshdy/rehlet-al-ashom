import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { IconBadge } from "@/components/IconBadge";

interface SubscribeCourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength?: number;
  link: string;
}

const SubscribeCourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  link,
}: SubscribeCourseCardProps) => {
  return (
    <Link href={`/${link}/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>

        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>

          {chaptersLength && (
            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
              <div className="flex items-center gap-x-1 text-slate-500">
                <IconBadge icon={BookOpen} size="sm" />
                <span>
                  {chaptersLength} {chaptersLength === 1 ? "فيديو" : "فيديوهات"}
                </span>
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-green-500">
            أنت مشترك
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SubscribeCourseCard;
