"use client";
import * as React from "react";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

type CardBalanceProps = {
  accountId: string;
};

export default function CardBalance({ accountId }: CardBalanceProps) {
  const number = 123456.789;
  const [hideMoney, setHideMoney] = React.useState<boolean>(false);
  const router = useRouter();
  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>CA: 123123221/2</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-4 items-center justify-between">
          <p>Dinero disponible</p>
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
          <p className="text-2xl">
            {new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
            }).format(number)}
          </p>
        ) : (
          <p className="text-2xl">Shhh!</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => router.push(`/home/${accountId}/deposito`)}
        >
          <ArrowUpIcon className="mr-2 h-4 w-4" />
          Depositar
        </Button>
        <Button variant="outline">
          <ArrowDownIcon className="mr-2 h-4 w-4" />
          Retirar
        </Button>
      </CardFooter>
    </Card>
  );
}
