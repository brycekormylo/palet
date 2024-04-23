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
  setNewPalette: (palette: Palette) => void;
  primary: ColorHSL;
  setPrimary: (color: ColorHSL) => void;
  neutral: ColorHSL;
  setNeutral: (color: ColorHSL) => void;
  addAccent: (color: ColorHSL) => void;
  setAccents: (colors: ColorHSL[]) => void;
  current: ColorHSL;
  currentAccents: ColorHSL[];
  selected: SelectedColor;
  setSelectedColor: (selected: SelectedColor, index?: number) => void;
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

  const [currentAccents, setCurrentAccents] = useState<ColorHSL[]>([]);

  const [accentIndex, setAccentIndex] = useState<number>(0);

  const [palette, setPalette] = useState<Palette>({
    primary: { hue: 0, saturation: 100, luminance: 60 },
    neutral: { hue: 0, saturation: 100, luminance: 60 },
  });

  const setNewPalette = (palette: Palette) => {
    setPalette(palette);
  };

  const setPrimary = (color: ColorHSL) => {
    const newPalette = palette;
    newPalette.primary = color;
    setPalette(newPalette);
  };

  const setNeutral = (color: ColorHSL) => {
    const newPalette = palette;
    newPalette.neutral = color;
    setPalette(newPalette);
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

  return (
    <ColorContext.Provider
      value={{
        palette,
        setNewPalette,
        setPrimary,
        setNeutral,
        addAccent,
        setAccents,
        currentAccents,
        current,
        selected,
        setSelectedColor,
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
