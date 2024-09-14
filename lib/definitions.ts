import { z } from "zod";

export const CreateAccountSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  account_type: z.string().trim(), //([z.string(), z.number()]), //.min(2,{ message: 'Please enter a valid email.' }).trim()
});

export type NewAccountFormState =
  | {
      errors?: {
        name?: string[];
        account_type?: string[];
      };
      message?: string;
    }
  | undefined;
