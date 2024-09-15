import { DepositForm } from "../components/deposit-form";

export default function DepositPage() {
  return (
    <div className="w-full flex gap-8 items-start ms:flex-col md:flex-row justify-center px-8">
      <DepositForm />
    </div>
  );
}
