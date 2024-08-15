import { Wallet } from "@prisma/client";
import Card from "./Card";

interface WalletListProps {
  items: Wallet[];
}

const WalletList = ({ items }: WalletListProps) => {
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
              price={item.price!}
              description={item.description!}
              link="wallet"
            />
          ))}
        </div>
      </>
    </div>
  );
};

export default WalletList;
