"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ButtonCloseSession() {
  const router = useRouter();

  return (
    <>
      <Button variant={"outline"} onClick={() => router.push("/")}>
        Salir
      </Button>
    </>
  );
}
