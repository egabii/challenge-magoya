import CardBalance from "./components/card-balance";
import TransactionsHistory from "./components/transaction-history";

export default function HomePage() {
  return (
    <div className="w-full flex gap-8 items-start ms:flex-col md:flex-row justify-center px-8">
      <div className="flex-1 md:w-2/6">
        <CardBalance />
      </div>
      <div className="flex-1 md:w-4/6">
        <TransactionsHistory />
      </div>
    </div>
  );
}
