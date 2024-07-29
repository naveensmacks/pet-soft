"use client";
import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

export const PetContext = createContext<PetContextType | null>(null);
type PetContextType = {
  pets: Pet[];
  selectedPetId: String | null;
  selectedPet: Pet | undefined;
  noOfPets: number;
  handleEditPet: (newPet: Pet) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
  handleCheckOutPet: (id: string) => void;
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
  const handleEditPet = (newPet: Pet) => {
    setPets((pets) => pets.map((pet) => (pet.id === newPet.id ? newPet : pet)));
  };
  const handleAddPet = (newPet: Omit<Pet, "id">) => {
    const pet = { ...newPet, id: Date.now().toString() };
    setPets((pets) => [...pets, pet]);
    setSelectedPetId(pet.id);
  };
  const handleCheckOutPet = (id: string) => {
    setPets((pets) => pets.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };
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
