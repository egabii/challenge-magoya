"use client";

import {
  ChangeEvent,
  HTMLAttributes,
  SyntheticEvent,
  useEffect,
  useState,
  startTransition,
} from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { setAccount } from "@/app/store/accounts-slice";
import { useAppDispatch } from "@/app/store/hooks";
import { useLoginAccount } from "@/app/queries/account-query";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [accountNumber, setAccountNumber] = useState<number>(0);
  const router = useRouter();

  const { mutate, isSuccess, error, data, isPending } = useLoginAccount();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isSuccess && data?.id !== 0) {
      dispatch(setAccount(data));
      router.push("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    mutate(accountNumber);
  };

  const goToSignUp = () => {
    startTransition(() => {
      router.push("/sign-up");
    });
  };

  return (
    <div className={cn("grid gap-6 w-[350px]", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="account-number">
              Numero de Cuenta
            </Label>
            <Input
              className="p-6 text-lg"
              id="account-number"
              placeholder="numero de cuenta"
              type="text"
              autoCapitalize="none"
              autoComplete="account-number"
              autoCorrect="off"
              disabled={isPending}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const parsedValueToInt = parseInt(event.target.value);
                if (!isNaN(parsedValueToInt)) {
                  setAccountNumber(parsedValueToInt);
                }
              }}
            />
          </div>
          <Button disabled={isPending} className="text-xl p-6 mt-4">
            {isPending && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
            Inicia sesion
          </Button>
          {error && (
            <p className="text-red-500">Algo salio mal. Intente mas tarde</p>
          )}
        </div>
      </form>
      <div className="relative">
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O te puedes crear una cuenta y acceder a todos nuestros beneficios
          </span>
        </div>
      </div>
      <Button
        className="text-xl p-6"
        variant="outline"
        type="button"
        disabled={isPending}
        onClick={goToSignUp}
      >
        Crear cuenta
      </Button>
    </div>
  );
}
