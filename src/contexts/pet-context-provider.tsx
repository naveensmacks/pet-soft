"use client";
import { addPet, deletePet, editPet } from "@/actions/actions";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";
import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

export const PetContext = createContext<PetContextType | null>(null);
type PetContextType = {
  pets: Pet[];
  selectedPetId: String | null;
  selectedPet: Pet | undefined;
  noOfPets: number;
  handleEditPet: (id: Pet["id"], newPetData: PetEssentials) => Promise<void>;
  handleAddPet: (newPet: PetEssentials) => Promise<void>;
  handleCheckOutPet: (id: Pet["id"]) => Promise<void>;
  handleChangeSelectedPetId: (id: Pet["id"]) => void;
};
type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};
export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  //state
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload, id: Math.random().toString() }];
        case "edit":
          return state.map((pet) => (pet.id === payload.id ? payload : pet));
        case "delete":
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    }
  );
  //const [pets, setPets] = useState<Pet[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const noOfPets = optimisticPets.length;

  //event handlers/actions
  const handleEditPet = async (id: Pet["id"], newPetData: PetEssentials) => {
    setOptimisticPets({ action: "edit", payload: { ...newPetData, id } });
    const error = await editPet(selectedPet?.id as string, newPetData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };
  const handleAddPet = async (newPet: PetEssentials) => {
    setOptimisticPets({ action: "add", payload: newPet });
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };
  const handleCheckOutPet = async (id: string) => {
    setOptimisticPets({ action: "delete", payload: id });
    const error = await deletePet(id);
    if (error) {
      toast.warning(error.message);
      return;
    }
    setSelectedPetId(null);
  };
  const handleChangeSelectedPetId = async (id: Pet["id"]) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        handleChangeSelectedPetId,
        noOfPets,
        handleEditPet,
        handleAddPet,
        handleCheckOutPet,
        selectedPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
