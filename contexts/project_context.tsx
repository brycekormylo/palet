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
  accents?: ColorHSL[];
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
  addAccent: (color: ColorHSL) => void;
  setAccents: (colors: ColorHSL[]) => void;
  current: ColorHSL;
  currentAccents: ColorHSL[];
  selected: SelectedColor;
  setSelectedColor: (selected: SelectedColor, index?: number) => void;
  swapSelectedColor: (color: ColorHSL) => void;
  accentIndex: number;
  setAccentIndex: (index: number) => void;
}

const ColorContext = createContext<ColorContextProps | undefined>(undefined);

interface ColorProviderProps {
  children: ReactNode;
}

const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const [selected, setSelected] = useState<SelectedColor>(
    SelectedColor.Primary
  );
  const [current, setCurrent] = useState<ColorHSL>({
    hue: 0,
    saturation: 100,
    luminance: 60,
  });
  const [primary, setPrimary] = useState<ColorHSL>({
    hue: 0,
    saturation: 100,
    luminance: 60,
  });
  const [neutral, setNeutral] = useState<ColorHSL>({
    hue: 0,
    saturation: 100,
    luminance: 60,
  });

  const [currentAccents, setCurrentAccents] = useState<ColorHSL[]>([]);

  const [accentIndex, setAccentIndex] = useState<number>(0);

  const [palette, setPalette] = useState<Palette>({
    primary: { hue: 0, saturation: 100, luminance: 60 },
    neutral: { hue: 60, saturation: 100, luminance: 60 },
  });

  const setPrimaryColor = (color: ColorHSL) => {
    const newPalette = palette;
    newPalette.primary = color;
    setPalette(newPalette);
    setPrimary(palette.primary);
  };

  const setNeutralColor = (color: ColorHSL) => {
    const newPalette = palette;
    newPalette.neutral = color;
    setPalette(newPalette);
    setNeutral(palette.neutral);
  };

  const addAccent = (color: ColorHSL) => {
    const newPalette = palette;
    if (!newPalette.accents) {
      newPalette.accents = [];
    }
    newPalette.accents.push(color);
    setPalette(newPalette);
    setCurrentAccents(palette.accents ?? []);
  };

  const setAccents = (colors: ColorHSL[]) => {
    const newPalette = palette;
    if (!newPalette.accents) {
      newPalette.accents = [];
    }
    newPalette.accents = colors;
    setPalette(newPalette);
    setCurrentAccents(newPalette.accents)
  };

  const setSelectedColor = (selected: SelectedColor, index?: number) => {
    setSelected(selected);
    switch (selected) {
      case SelectedColor.Primary: {
        setCurrent(palette.primary);
      }
      case SelectedColor.Neutral: {
        setCurrent(palette.neutral);
      }
      case SelectedColor.Accents: {
        setCurrent(
          palette.accents?.at(index ?? 0) ?? {
            hue: 0,
            saturation: 100,
            luminance: 60,
          }
        );
        setAccentIndex(index ?? 0);
        setCurrentAccents(palette.accents ?? []);
      }
    }
  };

  const swapSelectedColor = (color: ColorHSL) => {
    switch (selected) {
      case SelectedColor.Primary: {
        setPrimaryColor(color)
      }
      case SelectedColor.Neutral: {
        setNeutralColor(color)
      }
      case SelectedColor.Accents: {
        const newAccents = [...currentAccents]
        newAccents[accentIndex] = color
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
        addAccent,
        setAccents,
        currentAccents,
        current,
        selected,
        setSelectedColor,
        swapSelectedColor,
        accentIndex,
        setAccentIndex,
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
