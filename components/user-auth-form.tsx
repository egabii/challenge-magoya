"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/home?accountId=1");
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6 w-[350px]", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              className="p-4 text-lg"
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="account-number">
              Numero de Cuenta
            </Label>
            <Input
              className="p-4 text-lg"
              id="account-number"
              placeholder="numero de cuenta"
              type="text"
              autoCapitalize="none"
              autoComplete="account-number"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading} className="text-xl p-6 mt-4">
            {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
            Inicia sesion
          </Button>
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
        disabled={isLoading}
      >
        {isLoading ? <Spinner className="mr-2 h-4 w-4 animate-spin" /> : null}{" "}
        Crear cuenta
      </Button>
    </div>
  );
}
