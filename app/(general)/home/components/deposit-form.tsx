"use client";
import { useState, FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { selectBalance, incrementBalance } from "@/app/store/accounts-slice";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { currencyFormat } from "@/lib/utils";

export function DepositForm() {
  const balance = useAppSelector(selectBalance);
  const [amount, setAmount] = useState<number>(0);
  const dispatch = useAppDispatch();
  const onChangeAmountInput = (e: FormEvent<HTMLInputElement>) => {
    setAmount(e.currentTarget.value);
  };

  const onSubmit = () => {
    const partialValue = amount;
    partialValue.replace("$", "");
    const splittedPartialValue = partialValue.split(",");
    const decimal = splittedPartialValue[1].length ?? 0;
    const joinedValue = splittedPartialValue.join("");
    dispatch(incrementBalance(+joinedValue / Math.pow(10, decimal)));
  };
  return (
    <Card className="w-4/6">
      <CardHeader>
        <CardTitle className="text-2xl">Deposite </CardTitle>
        <CardDescription>
          <p className="text-lg">Elegí cómo ingresar dinero</p>
          <p className="text-lg">Tu Balance: {balance}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="amount" className="text-lg">
                Monto
              </Label>
              <Input
                id="amount"
                placeholder="$100,00"
                className="p-6"
                onChange={onChangeAmountInput}
                value={currencyFormat(amount)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className="p-8 text-lg" onClick={onSubmit}>
          Depositar
        </Button>
      </CardFooter>
    </Card>
  );
}
