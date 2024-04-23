"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";


interface ShelfContextProps {
  extend: boolean;
  setExtended: (colors: boolean) => void;
}

const ShelfContext = createContext<ShelfContextProps | undefined>(undefined);

interface ShelfProviderProps {
  children: ReactNode;
}

const ShelfProvider: React.FC<ShelfProviderProps> = ({ children }) => {

  const [extend, setExtended] = useState(false);

  const setIsExtended = (isExtended: boolean) => {
    setExtended(isExtended)
  }

  return (
    <ShelfContext.Provider
      value={{
        extend,
        setExtended
      }}
    >
      {children}
    </ShelfContext.Provider>
  );
};

const useShelfContext = () => {
  const context = useContext(ShelfContext);
  if (!context) {
    throw new Error("useShelfContext must be used within a ShelfProvider");
  }
  return context;
};

export { ShelfProvider, useShelfContext, ShelfContext };
