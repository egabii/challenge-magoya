"use client";
import { useState } from "react";
import {
  EyeClosedIcon,
  EyeOpenIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { selectBalance, selectAccountDetail } from "@/app/store/accounts-slice";
import { useAppSelector } from "@/app/store/hooks";
import { currencyFormat } from "@/lib/utils";

export default function CardBalance() {
  const [hideMoney, setHideMoney] = useState<boolean>(false);
  const balance = useAppSelector(selectBalance);
  const accountDetail = useAppSelector(selectAccountDetail);
  const router = useRouter();

  return (
    <Card className="w-6/6">
      <CardHeader>
        <CardTitle className="text-2xl">
          Numero de cuenta: {accountDetail.accountNumber}
        </CardTitle>
        <CardDescription className="text-lg">
          Titular: {accountDetail.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-4 items-center justify-start">
          <p className="text-2lx">Dinero disponible</p>
          <Button
            variant="ghost"
            className=""
            size="icon"
            onClick={() => setHideMoney((prevState) => !prevState)}
          >
            {hideMoney ? (
              <EyeClosedIcon className="h-6 w-6" />
            ) : (
              <EyeOpenIcon className="h-6 w-6" />
            )}
          </Button>
        </div>
        {!hideMoney ? (
          <p className="text-2xl">{currencyFormat(balance)}</p>
        ) : (
          <p className="text-2xl">Shhh!</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          className="p-6"
          variant="outline"
          onClick={() => router.push("/home/deposit")}
        >
          <ArrowUpIcon className="mr-2 h-4 w-4" />
          Depositar
        </Button>
        <Button
          className="p-6"
          variant="outline"
          onClick={() => router.push("/home/withdraw")}
        >
          <ArrowDownIcon className="mr-2 h-4 w-4" />
          Retirar
        </Button>
      </CardFooter>
    </Card>
  );
}
