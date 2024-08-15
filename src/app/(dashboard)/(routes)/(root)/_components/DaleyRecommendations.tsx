import Heading from "@/components/Heading";
import React from "react";
import DaleyRecommendationsList from "./DaleyRecommendationsList";
import { FcCalendar } from "react-icons/fc";
import { getDailyRecommendations } from "@/actions/get-daily-recommendations";

const DaleyRecommendations = async () => {
  const recommendations = await getDailyRecommendations();

  return (
    <section id="dailyRecommendations" className="p-7 bg-gray-100">
      <Heading title="التوصيات اليومية" icon={<FcCalendar />} />

      <div className="md:p-6 space-y-4">
        <DaleyRecommendationsList items={recommendations} />
      </div>
    </section>
  );
};

export default DaleyRecommendations;
