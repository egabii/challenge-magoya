import CardBalance from "./components/card-balance";
import TransactionsHistory from "./components/transaction-history";

export default function HomePage() {
  return (
    <div className="w-full flex gap-8 items-start ms:flex-col md:flex-col justify-center px-8">
      <div className="flex-1 md:w-full">
        <CardBalance />
      </div>
      <div className="flex-1 md:w-full">
        <TransactionsHistory />
      </div>
    </div>
  );
}
