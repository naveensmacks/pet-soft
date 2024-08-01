"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./pet-form";
import { flushSync } from "react-dom";

type PetButtonProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  actionType: "add" | "edit" | "checkout";
  onClick?: () => void;
};
export default function PetButton({
  children,
  disabled,
  actionType,
  onClick,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  if (actionType === "checkout") {
    return (
      <Button variant="secondary" disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    );
  }
  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button size="icon">
            <PlusIcon className="w-6 h-6" />
          </Button>
        ) : (
          <Button variant="secondary">{children}</Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add a new pet" : "Edit pet"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <PetForm
          actionType={actionType}
          onFormSubmission={() => {
            flushSync(() => setIsFormOpen(false));
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
