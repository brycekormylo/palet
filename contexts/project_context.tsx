"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

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

const defaultColor: ColorHSL = { hue: 0, saturation: 100, luminance: 60 };

const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [current, setCurrent] = useState<ColorHSL>(defaultColor);

  const [primary, setPrimary] = useState<ColorHSL>(defaultColor);
  const [neutral, setNeutral] = useState<ColorHSL>({ hue: 0, saturation: 100, luminance: 2 });
  const [accents, setAccents] = useState<ColorHSL[]>([]);

  useEffect(() => {
    switch (selectedIndex) {
      case 0:
        setCurrent(primary);
        break;
      case 1:
        setCurrent(neutral);
        break;
      default:
        setCurrent(accents[selectedIndex - 2] || defaultColor);
        break;
    }
  }, [selectedIndex, primary, neutral, accents]);

  const createNewAccent = () => {
    accents.push(defaultColor);
  };

  const changeSelection = (index: number) => {
    setSelectedIndex(index);
  };

  const swapSelectedColor = (color: ColorHSL) => {
    switch (selectedIndex) {
      case 0: {
        setPrimary(color);
        break;
      }
      case 1: {
        setNeutral(color);
        break;
      }
      default: {
        const newAccents = [...accents];
        newAccents[selectedIndex - 2] = color;
        setAccents(newAccents);
        break;
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
