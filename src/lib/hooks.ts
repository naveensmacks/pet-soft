import { PetContext } from "@/contexts/pet-context-provider";
import { SearchContext } from "@/contexts/search-context-provider";
import { useContext } from "react";

export function usePetContext() {
  const petContext = useContext(PetContext);
  if (!petContext) {
    throw new Error("usePetContext must be used within a PetContextProvider");
  }
  return petContext;
}

export function useSearchContext() {
  const searchContext = useContext(SearchContext);
  if (!searchContext) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider"
    );
  }
  return searchContext;
}
