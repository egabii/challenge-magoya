"use client";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ButtonCloseSession() {
  const router = useRouter();

  return (
    <>
      <Button variant={"outline"} onClick={() => router.push("/")}>
        <Cross1Icon className="mr-2 w-4 h-4" />
        Salir
      </Button>
    </>
  );
}
