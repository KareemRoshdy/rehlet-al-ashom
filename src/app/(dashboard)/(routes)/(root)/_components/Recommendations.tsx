import Heading from "@/components/Heading";
import React from "react";
import RecommendationsList from "./RecommendationsList";
import { FcCandleSticks } from "react-icons/fc";
import { getRecommendations } from "@/actions/get-recommendations";

const Recommendations = async () => {
  const recommendations = await getRecommendations();
  return (
    <section id="Recommendations" className="p-7">
      <Heading title="التوصيات اللحظية" icon={<FcCandleSticks />} />

      <div className="md:p-6  space-y-4">
        <RecommendationsList items={recommendations} />
      </div>
    </section>
  );
};

export default Recommendations;
