import Heading from "@/components/Heading";
import React from "react";
import NewsList from "./NewsList";
import { getNews } from "@/actions/get-news";
import { FcNews } from "react-icons/fc";

const News = async () => {
  const news = await getNews();

  return (
    <section id="news" className="p-7 bg-gray-100">
      <Heading title="أهم الاخبار" icon={<FcNews />} />

      <div className="md:p-6  space-y-4">
        <NewsList items={news} />
      </div>
    </section>
  );
};

export default News;
