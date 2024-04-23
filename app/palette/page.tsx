"use client";

import { useColorContext } from "@/contexts/project_context";
import Swatch from "../(components)/swatch";
import { useEffect, useState } from "react";
import ColorSelector from "../(components)/color_selector";
import ColorRange from "../(components)/color_range";
import DemoUI from "../(components)/demo_ui";

enum SelectedColor {
  Primary,
  Neutral,
  Accents,
}

const Palette = () => {
  const {
    primary,
    neutral,
    accentIndex,
    setAccentIndex,
    selected,
    setSelectedColor,
    addAccent,
    currentAccents
  } = useColorContext();
  var hsl = require("hsl-to-hex");

  return (
    <div className="flex flex-row gap-10">
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-4">
          <div
            className={`${
              selected == SelectedColor.Primary ? "ring-2" : "ring-0"
            } p-4`}
            onClick={() => setSelectedColor(SelectedColor.Primary)}
          >
            <Swatch
              hex={hsl(
                primary.hue,
                primary.saturation,
                primary.luminance
              )}
            />
          </div>
          <div
            className={`${
              selected == SelectedColor.Neutral ? "ring-2" : "ring-0"
            } p-4`}
            onClick={() => setSelectedColor(SelectedColor.Neutral)}
          >
            <Swatch
              hex={hsl(
                neutral.hue,
                neutral.saturation,
                neutral.luminance
              )}
            />
          </div>
          {currentAccents.map((color, i) => (
            <div
              key={i}
              className={`${
                accentIndex == i && selected == SelectedColor.Accents
                  ? "ring-2"
                  : "ring-0"
              } p-4`}
              onClick={() => {
                setAccentIndex(i)
                setSelectedColor(SelectedColor.Accents, i)
              }}
            >
              <Swatch hex={hsl(color.hue, color.saturation, color.luminance)} />
            </div>
          ))}
          <button
            className="w-10 h-10 bg-white rounded-md flex flex-col justify-center items-center"
            onClick={() => {
              addAccent({ hue: 100, saturation: 100, luminance: 50 });
              setSelectedColor(SelectedColor.Accents, currentAccents.length - 1)
            }}
          >
            <p className="text-xl text-black">+</p>
          </button>
        </div>
        <ColorSelector />
        <ColorRange />
      </div>
      <DemoUI />
    </div>
  );
};

export default Palette;
