import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currencyFormat(
  amount: number,
  currency: string = "ARS",
  numberFormat: string = "es-AR"
) {
  return new Intl.NumberFormat(numberFormat, {
    style: "currency",
    currency,
  }).format(amount);
}

export function reverseCurrencyFormat(amount: string) {
  return;
}
