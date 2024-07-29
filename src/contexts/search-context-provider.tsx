"use client";
import React, { createContext, useState } from "react";

export const SearchContext = createContext<SearchContextType | null>(null);
type SearchContextType = {
  searchText: string;
  handleChangeSearchText: (text: string) => void;
};

type SearchContextProviderProps = {
  children: React.ReactNode;
};
export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  //state
  const [searchText, setSearchText] = useState("");

  //derived state

  //event handlers / actions
  const handleChangeSearchText = (text: string) => {
    setSearchText(text);
  };

  return (
    <SearchContext.Provider value={{ searchText, handleChangeSearchText }}>
      {children}
    </SearchContext.Provider>
  );
}
