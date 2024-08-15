import { News } from "@prisma/client";
import Card from "./Card";

interface NewsListProps {
  items: News[];
}

const NewsList = ({ items }: NewsListProps) => {
  return (
    <div>
      <>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl!}
              description={item.description!}
              link="news"
            />
          ))}
        </div>
      </>
    </div>
  );
};

export default NewsList;
