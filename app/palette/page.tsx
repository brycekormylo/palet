"use client";

import { useColorContext } from "@/contexts/project_context";
import Swatch from "../(components)/swatch";
import { useEffect, useState } from "react";
import ColorSelector from "../(components)/color_selector";
import ColorRange from "../(components)/color_range";
import DemoUI from "../(components)/demo_ui";

const Palette = () => {
  const {
    primary,
    neutral,
    selectedIndex,
    setSelectedColor,
    addNewAccent,
    accents,
  } = useColorContext();
  var hsl = require("hsl-to-hex");

  return (
    <div className="flex flex-row gap-10">
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-4">
          <div
            className={`${selectedIndex == 0 ? "ring-2" : "ring-0"} p-4`}
            onClick={() => setSelectedColor(0)}
          >
            <Swatch
              hex={hsl(primary.hue, primary.saturation, primary.luminance)}
            />
          </div>
          <div
            className={`${selectedIndex == 1 ? "ring-2" : "ring-0"} p-4`}
            onClick={() => setSelectedColor(1)}
          >
            <Swatch
              hex={hsl(neutral.hue, neutral.saturation, neutral.luminance)}
            />
          </div>
          {accents.map((color, i) => (
            <div
              key={i}
              className={`${
                selectedIndex == i
                  ? "ring-2"
                  : "ring-0"
              } p-4`}
              onClick={() => {
                setSelectedColor(i + 2);
              }}
            >
              <Swatch hex={hsl(color.hue, color.saturation, color.luminance)} />
            </div>
          ))}
          <button
            className="w-10 h-10 bg-white rounded-md flex flex-col justify-center items-center"
            onClick={() => {
              addNewAccent({ hue: 100, saturation: 100, luminance: 50 });
              setSelectedColor(2);
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
