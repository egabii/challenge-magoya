import { WithdrawForm } from "../components/withdraw-form";

export default function DepositPage() {
  return (
    <div className="w-full flex gap-8 items-start ms:flex-col md:flex-row justify-center px-8">
      <WithdrawForm />
    </div>
  );
}
