"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

type ColorHSL = {
  hue: number;
  saturation: number;
  luminance: number;
  name?: string;
};

interface ColorContextProps {
  primary: ColorHSL;
  neutral: ColorHSL;
  accents: ColorHSL[];
  createNewAccent: () => void;
  current: ColorHSL;
  selectedIndex: number;
  changeSelection: (index: number) => void;
  swapSelectedColor: (color: ColorHSL) => void;
}

const ColorContext = createContext<ColorContextProps | undefined>(undefined);

interface ColorProviderProps {
  children: ReactNode;
}

const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const defaultColor: ColorHSL = { hue: 0, saturation: 100, luminance: 60 };

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [current, setCurrent] = useState<ColorHSL>(defaultColor);

  const [primary, setPrimary] = useState<ColorHSL>(defaultColor);
  const [neutral, setNeutral] = useState<ColorHSL>(defaultColor);
  const [accents, setAccents] = useState<ColorHSL[]>([]);

  const createNewAccent = () => {
    accents.push(defaultColor);
  }

  const changeSelection = (index: number) => {
    setSelectedIndex(index);
    switch (selectedIndex) {
      case 0: {
        setCurrent(primary);
      }
      case 1: {
        setCurrent(neutral);
      }
      default: {
        setCurrent(accents[index - 2] ?? defaultColor);
      }
    }
  };

  const swapSelectedColor = (color: ColorHSL) => {
    switch (selectedIndex) {
      case 0: {
        setPrimary(color);
      }
      case 1: {
        setNeutral(color);
      }
      default: {
        const newAccents = [...accents];
        newAccents[selectedIndex - 2] = color;
        setAccents(newAccents);
      }
    }
  };

  return (
    <ColorContext.Provider
      value={{
        primary,
        neutral,
        accents,
        createNewAccent,
        current,
        selectedIndex,
        changeSelection,
        swapSelectedColor,
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
