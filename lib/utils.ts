import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const Intl_config = {
  locale: "es-AR",
  currency: "ARS",
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currencyFormat(
  amount: number,
  currency: string = Intl_config.currency,
  numberFormat: string = Intl_config.locale
) {
  return new Intl.NumberFormat(numberFormat, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
