"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

type ColorHSL = {
  hue: number;
  saturation: number;
  luminance: number;
};

interface ColorContextProps {
  colors: ColorHSL[];
  setNewColors: (colors: ColorHSL[]) => void;
  index: number;
  setIndex: (index: number) => void;
}

const ColorContext = createContext<ColorContextProps | undefined>(undefined);

interface ColorProviderProps {
  children: ReactNode;
}

const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const [colors, setColors] = useState<ColorHSL[]>([
    { hue: 0, saturation: 100, luminance: 60 },
  ]);

  const setNewColors = (colors: ColorHSL[]) => {
    setColors(colors);
  };

  const [index, setIndex] = useState<number>(0);

  return (
    <ColorContext.Provider
      value={{
        colors,
        setNewColors,
        index,
        setIndex
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

const useColorContext = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColorContext must be used within a ColorProvider");
  }
  return context;
};

export { ColorProvider, useColorContext, ColorContext };
