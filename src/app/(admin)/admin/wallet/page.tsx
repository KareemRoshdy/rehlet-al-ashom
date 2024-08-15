import { redirect } from "next/navigation";
import prisma from "@/lib/db";

import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs/server";

const WalletsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const wallets = await prisma.wallet.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={wallets} />
    </div>
  );
};

export default WalletsPage;
