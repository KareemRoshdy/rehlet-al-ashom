import Heading from "@/components/Heading";
import React from "react";
import WalletList from "./WalletList";
import { FcMoneyTransfer } from "react-icons/fc";
import { getWallet } from "@/actions/get-wallet";

const Wallet = async () => {
  const wallet = await getWallet();
  return (
    <section id="wallet" className="p-7">
      <Heading title="إدارة المحافظ" icon={<FcMoneyTransfer />} />

      <div className="md:p-6  space-y-4">
        <WalletList items={wallet} />
      </div>
    </section>
  );
};

export default Wallet;
