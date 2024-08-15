import { Preview } from "@/components/preview";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  price?: number;
  link: string;
}

const NewsCard = ({
  id,
  title,
  imageUrl,
  description,
  price,
  link,
}: NewsCardProps) => {
  return (
    <Link href={`/${link}/${id}`} className="card">
      <div className="group hover:shadow-md transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>

        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>

          {description && (
            <p className="text-xs text-muted-foreground line-clamp-2 my-2">
              <Preview value={description} />
            </p>
          )}

          {price && (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
