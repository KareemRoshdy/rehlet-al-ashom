import { redirect } from "next/navigation";
import prisma from "@/lib/db";

import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs/server";

const RecommendationsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const recommendations = await prisma.daleyRecommendation.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={recommendations} />
    </div>
  );
};

export default RecommendationsPage;
