"use server";
//import { CreateAccountSchema, NewAccountFormState } from "@/lib/definitions";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/* interface IAccount {
  name: string;
  accountNumber: string;
} */

interface IAccountResponse {
  id: string | number;
  error: {
    message: string;
  };
}

const saveAccount = (/*
  payloadResponse: IAccount
 */): Promise<Partial<IAccountResponse>> =>
  new Promise((resolve, reject) => {
    const fetcher = async () => {
      const response = await fetch("http://localhost:4000/accounts/1", {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
        //body: JSON.stringify(payloadResponse),
      });
      if (response.ok) {
        return resolve({ id: 1 });
      } else {
        return reject({ error: { message: "error on POST Method" } });
      }
    };

    setTimeout(fetcher, 2000);
  });

export async function createAccount() {
  let response: Partial<IAccountResponse> | null = null;
  try {
    // Call database
    response = await saveAccount(/* {
      name: "Gabriel",
      accountNumber: "1",
    } */);
    console.log(response);
    if (!!response.error) {
      throw new Error(response.error.message);
    }
  } catch (err) {
    // Handle errors
    console.log(err);
  }

  if (!!response?.id) {
    revalidatePath("/home"); // que hace esto??
    redirect(`/home?account=${response.id}`); // Navigate to the new account
  }
}
