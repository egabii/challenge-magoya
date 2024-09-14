"use server";
//import { CreateAccountSchema, NewAccountFormState } from "@/lib/definitions";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const error = false;

const fetch = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject("error");
      } else {
        resolve("success");
      }
    }, 2000);
  });

export async function createAccount() {
  console.log("que esta pasando aqui!");
  try {
    // Call database
    const response = await fetch();
    if (!error && response === "success") {
      console.log("aca estoy dentro del if!");
    }
  } catch (err) {
    // Handle errors
    console.log(err);
  }

  revalidatePath("/home"); // que hace esto??
  redirect(`/home`); // Navigate to the new account
}
