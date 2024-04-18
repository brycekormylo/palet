"use client";

import { useColorContext } from "@/contexts/project_context";
import Swatch from "../(components)/swatch";
import { useEffect, useState } from "react";
import ColorSelector from "../(components)/color_selector";

const Palette = () => {
  const { colors, setNewColors, index, setIndex } = useColorContext();
  var hsl = require("hsl-to-hex");

  const addNewColor = () => {
    const newColors = [...colors];
    const defaultColor = { hue: 100, saturation: 100, luminance: 100 };
    newColors.push(defaultColor);
    console.log(newColors);
    setNewColors(newColors);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-4">
        {colors.map((color, i) => (
          <div
            key={i}
            className={`${index == i ? "ring-2" : "ring-0"} p-4`}
            onClick={() => setIndex(i)}
          >
            <Swatch color={hsl(color.hue, color.saturation, color.luminance)} />
          </div>
        ))}
        <button
          className="w-10 h-10 bg-white rounded-md flex flex-col justify-center items-center"
          onClick={addNewColor}
        >
          <p className="text-xl text-black">+</p>
        </button>
      </div>
      <ColorSelector></ColorSelector>
    </div>
  );
};

export default Palette;