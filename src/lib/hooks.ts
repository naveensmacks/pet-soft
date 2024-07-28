import { PetContext } from "@/contexts/pet-context-provider";
import { useContext } from "react";

export function usePetContext() {
  const petContext = useContext(PetContext);
  if (!petContext) {
    throw new Error("usePetContext must be used within a PetContextProvider");
  }
  return petContext;
}
