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
  setPrimaryColor: (color: ColorHSL) => void;
  neutral: ColorHSL;
  setNeutralColor: (color: ColorHSL) => void;
  accents: ColorHSL[];
  addNewAccent: (color: ColorHSL) => void;
  setAccents: (colors: ColorHSL[]) => void;
  current: ColorHSL;
  setSelectedColor: (index: number) => void;
  swapSelectedColor: (color: ColorHSL) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
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

  const setPrimaryColor = (color: ColorHSL) => {
    setPrimary(color);
    setCurrent(primary);
  };

  const setNeutralColor = (color: ColorHSL) => {
    setNeutral(color);
    setCurrent(neutral);
  };

  const addNewAccent = (color: ColorHSL) => {
    const newAccents: ColorHSL[] = [...accents];
    newAccents.push(color);
    setAccentColors(newAccents);
    setCurrent(accents[selectedIndex - 2]);
  };

  const setAccentColors = (colors: ColorHSL[]) => {
    setAccents(colors);
  };

  const setSelectedColor = (index: number) => {
    setSelectedIndex(index);
    switch (selectedIndex) {
      case 0: {
        setCurrent(primary);
      }
      case 1: {
        setCurrent(neutral);
      }
      default: {
        setCurrent(accents[index - 2]);
      }
    }
  };

  const swapSelectedColor = (color: ColorHSL) => {
    switch (selectedIndex) {
      case 0: {
        setPrimaryColor(color);
      }
      case 1: {
        setNeutralColor(color);
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
        setPrimaryColor,
        neutral,
        setNeutralColor,
        addNewAccent,
        setAccents,
        accents,
        current,
        setSelectedColor,
        swapSelectedColor,
        selectedIndex,
        setSelectedIndex,
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
