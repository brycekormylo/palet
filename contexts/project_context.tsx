"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

type ColorHSL = {
  hue: number;
  saturation: number;
  luminance: number;
  name?: string;
};

type Palette = {
  primary: ColorHSL;
  neutral: ColorHSL;
  accents: ColorHSL[];
};

export enum SelectedColor {
  Primary,
  Neutral,
  Accents,
}

interface ColorContextProps {
  palette: Palette;
  primary: ColorHSL;
  setPrimaryColor: (color: ColorHSL) => void;
  neutral: ColorHSL;
  setNeutralColor: (color: ColorHSL) => void;
  accents: ColorHSL[];
  addNewAccent: (color: ColorHSL) => void;
  setAccents: (colors: ColorHSL[]) => void;
  current: ColorHSL;
  selected: SelectedColor;
  setSelectedColor: (selected: SelectedColor, index?: number) => void;
  swapSelectedColor: (color: ColorHSL) => void;
  selectedAccent: number;
  setSelectedAccent: (index: number) => void;
}

const ColorContext = createContext<ColorContextProps | undefined>(undefined);

interface ColorProviderProps {
  children: ReactNode;
}

const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const defaultColor: ColorHSL = { hue: 0, saturation: 100, luminance: 60 };

  const [selected, setSelected] = useState<SelectedColor>(
    SelectedColor.Primary
  );
  const [selectedAccent, setSelectedAccent] = useState<number>(0);

  const [current, setCurrent] = useState<ColorHSL>(defaultColor);
  const [primary, setPrimary] = useState<ColorHSL>(defaultColor);
  const [neutral, setNeutral] = useState<ColorHSL>(defaultColor);
  const [accents, setAccents] = useState<ColorHSL[]>([]);

  const [palette, setPalette] = useState<Palette>({
    primary: defaultColor,
    neutral: defaultColor,
    accents: [],
  });

  const setPrimaryColor = (color: ColorHSL) => {
    setPrimary(color);
    const newPalette = palette;
    newPalette.primary = color;
    setPalette(newPalette);
  };

  const setNeutralColor = (color: ColorHSL) => {
    setNeutral(color);
    const newPalette = palette;
    newPalette.neutral = color;
    setPalette(newPalette);
  };

  const addNewAccent = (color: ColorHSL) => {
    const newAccents: ColorHSL[] = [...accents];
    newAccents.push(color);
    setAccentColors(newAccents);
    const newPalette = palette;
    newPalette.accents = newAccents;
    setPalette(newPalette);
  };

  const setAccentColors = (colors: ColorHSL[]) => {
    setAccents(colors);
    const newPalette = palette;
    newPalette.accents = colors;
    setPalette(newPalette);
  };

  const setSelectedColor = (selected: SelectedColor, index?: number) => {
    setSelected(selected);
    switch (selected) {
      case SelectedColor.Primary: {
        setCurrent(primary);
      }
      case SelectedColor.Neutral: {
        setCurrent(neutral);
      }
      case SelectedColor.Accents: {
        setCurrent(accents.at(index ?? 0) ?? defaultColor);
        setSelectedAccent(index ?? 0);
        setAccentColors(accents);
      }
    }
  };

  const swapSelectedColor = (color: ColorHSL) => {
    switch (selected) {
      case SelectedColor.Primary: {
        setPrimaryColor(color);
      }
      case SelectedColor.Neutral: {
        setNeutralColor(color);
      }
      case SelectedColor.Accents: {
        const newAccents = [...accents];
        newAccents[selectedAccent] = color;
        setAccents(newAccents);
      }
    }
  };

  return (
    <ColorContext.Provider
      value={{
        palette,
        primary,
        setPrimaryColor,
        neutral,
        setNeutralColor,
        addNewAccent,
        setAccents,
        accents,
        current,
        selected,
        setSelectedColor,
        swapSelectedColor,
        selectedAccent,
        setSelectedAccent,
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
