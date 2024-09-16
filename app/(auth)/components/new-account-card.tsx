"use client";
import { SyntheticEvent, ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CurrencyInput, {
  CurrencyInputOnChangeValues,
} from "react-currency-input-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Intl_config, cn } from "@/lib/utils";
import { useCreateAccount } from "@/app/queries/account-query";
import { setAccount } from "@/app/store/accounts-slice";
import { useAppDispatch } from "@/app/store/hooks";

export function NewAccountCard() {
  const [amount, setAmount] = useState<string | undefined>("0");
  const [accountNumber, setAccountNumber] = useState(0);
  const [name, setName] = useState("");
  const [parsedAmount, setParsedAmount] = useState<number>(0);
  const mutation = useCreateAccount();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (mutation.isSuccess && mutation?.data?.id !== 0) {
      dispatch(setAccount(mutation?.data));
      router.push("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.data, mutation.isSuccess]);

  useEffect(() => {
    console.log(mutation.error);
  }, [mutation.error]);

  const onChangeAmountInput = (
    value: string | undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _name: string = "",
    values: CurrencyInputOnChangeValues | undefined
  ) => {
    setAmount(value ?? "0");
    setParsedAmount(values?.float ?? 0);
  };

  const onCreate = (event: SyntheticEvent) => {
    event.preventDefault();
    mutation.mutate({
      name,
      accountNumber,
      balance: parsedAmount,
    });
  };

  const onChangeAccountNumer = (event: ChangeEvent<HTMLInputElement>) => {
    const parsedValueFromInput = parseInt(event.target.value);
    if (!isNaN(parsedValueFromInput)) {
      setAccountNumber(parsedValueFromInput);
    }
  };

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Crea una nueva cuenta</CardTitle>
        <CardDescription>
          Al crear una nueva cuenta, obtene todos los beneficios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onCreate}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                className="p-6"
                id="name"
                placeholder="Nombre completo del titular"
                value={name}
                onChange={onChangeName}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="account-number">Numero de cuenta</Label>
              <Input
                className="p-6"
                id="account-number"
                placeholder="10001"
                value={accountNumber}
                onChange={onChangeAccountNumer}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="balance">Saldo Inicial</Label>
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
              {mutation.error && (
                <p className="text-red-600 text-lg">
                  Ocurrio un error. Intentelo mas tarde
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between pt-8">
            <Button
              variant="outline"
              className="text-xl p-6 mt-4"
              disabled={mutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="text-xl p-6 mt-4"
              disabled={mutation.isPending}
            >
              {mutation.isPending && (
                <Spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Crear
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
