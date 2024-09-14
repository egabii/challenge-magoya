"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  //CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createAccount } from "@/app/actions/user";

export default function NewAccountCard({}) {
  const onCreate = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    await createAccount();
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Crea una nueva cuenta</CardTitle>
        <CardDescription>
          Al crear una nueva cuenta, obtene todos los beneficios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onCreate}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" placeholder="Nombre completo del titular" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="bank-account">Tipo de cuenta</Label>
              <Select>
                <SelectTrigger id="bank-account">
                  <SelectValue placeholder="Elije tu cuenta" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="ars">Caja de ahorro en pesos</SelectItem>
                  <SelectItem value="usd">Caja de ahorro en dolares</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between pt-8">
            <Button variant="outline">Cancelar</Button>
            <Button type="submit">Crear</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
