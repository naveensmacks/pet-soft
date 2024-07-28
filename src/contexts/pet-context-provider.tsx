"use client";
import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

export const PetContext = createContext<PetContextType | null>(null);
type PetContextType = {
  pets: Pet[];
  selectedPetId: String | null;
  selectedPet: Pet | undefined;
  noOfPets: number;
  handleChangeSelectedPetId: (id: string) => void;
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
  const [pets, setPets] = useState<Pet[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const noOfPets = pets.length;

  //event handlers/actions
  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };
  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleChangeSelectedPetId,
        noOfPets,
        selectedPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
