"use client";
import { useState, useEffect, startTransition } from "react";
import { useRouter } from "next/navigation";

import CurrencyInput, {
  CurrencyInputOnChangeValues,
} from "react-currency-input-field";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { selectBalance, selectAccountDetail } from "@/app/store/accounts-slice";
import { useAppSelector } from "@/app/store/hooks";
import { useMutateBalance } from "../queries/account-query";
import { Intl_config, cn } from "@/lib/utils";

export function WithdrawForm() {
  const balance = useAppSelector(selectBalance);
  const accountDetail = useAppSelector(selectAccountDetail);
  const [amount, setAmount] = useState<string>("0");
  const [parsedAmount, setParsedAmount] = useState<number>(0);
  const [error, setError] = useState(false);
  const mutation = useMutateBalance();
  const router = useRouter();

  useEffect(() => {
    if (mutation.isSuccess) {
      startTransition(() => {
        router.push("/home");
      });
    }
  }, [mutation.isSuccess]);

  if (accountDetail.accountNumber === 0) {
    startTransition(() => {
      router.push("/");
    });
  }

  const onChangeAmountInput = (
    value: string | undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _name: string = "",
    values: CurrencyInputOnChangeValues | undefined
  ) => {
    const floatValue = values?.float ?? 0;
    setAmount(value ?? "0");
    if (error && floatValue < balance) {
      setError(false);
    } else if (floatValue > balance) {
      setError(true);
    } else {
      setParsedAmount(values?.float ?? 0);
    }
  };

  const onSubmit = () => {
    mutation.mutate({
      type: "Retiro",
      accountNumber: accountDetail.accountNumber,
      balance: parsedAmount,
    });
  };

  return (
    <Card className="w-4/6">
      <CardHeader>
        <CardTitle className="text-2xl"> Realice su Retiro </CardTitle>
        <CardDescription className="flex flex-col">
          <span className="text-lg">Tu Balance: {balance}</span>
          <span className="text-lg">
            Recuerde que toda transaccion es irreversible, si no esta seguro, no
            continue con la operacion
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="amount" className="text-lg">
                Monto
              </Label>
              <CurrencyInput
                className={cn(
                  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                  "p-6"
                )}
                intlConfig={{ ...Intl_config }}
                id="amount"
                name="money-field"
                value={amount}
                prefix="$"
                placeholder="Please enter a number"
                defaultValue={1000}
                decimalsLimit={2}
                onValueChange={onChangeAmountInput}
              />
              {error && (
                <p className="text-red-600 text-lg">
                  El monto a retirar es mayor al balance en cuenta
                </p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          className="p-8 text-lg"
          onClick={onSubmit}
          disabled={error || parsedAmount === 0}
        >
          {mutation.isPending && (
            <Spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Retirar
        </Button>
      </CardFooter>
    </Card>
  );
}
