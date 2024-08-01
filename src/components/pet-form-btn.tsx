import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { DialogClose } from "./ui/dialog";

type PetFormBtnProps = {
  actionType: "add" | "edit";
};
export default function PetFormBtn({ actionType }: PetFormBtnProps) {
  const { pending } = useFormStatus();
  //dialog imediately closes , so do something of load spinner later
  //cannot use DialogClose as we cannot show serverside errors before closing
  return (
    //<DialogClose asChild>
    <Button type="submit" disabled={pending} className="mt-5 self-end">
      {actionType === "add" ? "Add a new pet" : "Edit pet"}
    </Button>
    //</DialogClose>
  );
}
