"use client";

import { useColorContext } from "@/contexts/project_context";
import Swatch from "../(components)/swatch";
import { useEffect, useState } from "react";
import ColorSelector from "../(components)/color_selector";
import ColorRange from "../(components)/color_range";
import CodeShelf from "../(components)/code_shelf";

const Palette = () => {
  const {
    primary,
    neutral,
    accents,
    createNewAccent,
    selectedIndex,
    changeSelection,
  } = useColorContext();
  var hsl = require("hsl-to-hex");

  useEffect(() => {}, [accents]);

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row justify-start gap-10">
        <div className="flex flex-col justify-start items-center gap-4 bg-black rounded-tl-3xl p-4">
          <div
            className={`${selectedIndex == 0 ? "ring-2" : "ring-0"} rounded-lg ring-white`}
            onClick={() => changeSelection(0)}
          >
            <Swatch
              hex={hsl(primary.hue, primary.saturation, primary.luminance)}
            />
          </div>
          <div
            className={`${selectedIndex == 1 ? "ring-2" : "ring-0"} rounded-lg ring-white`}
            onClick={() => changeSelection(1)}
          >
            <Swatch
              hex={hsl(neutral.hue, neutral.saturation, neutral.luminance)}
            />
          </div>
          {accents.map((color, i) => (
            <div
              key={i}
              className={`${selectedIndex - 2 == i ? "ring-2" : "ring-0"} rounded-lg ring-white`}
              onClick={() => {
                changeSelection(i + 2);
              }}
            >
              <Swatch hex={hsl(color.hue, color.saturation, color.luminance)} />
            </div>
          ))}
          <button
            className="w-10 h-10 bg-white rounded-md flex flex-col justify-center items-center hover:scale-[1.02]"
            onClick={() => {
              createNewAccent();
              changeSelection(accents.length + 2);
            }}
          >
            <p className="text-xl text-black">+</p>
          </button>
        </div>
        <div className="flex flex-col pt-8 gap-4">
          <ColorSelector />
          <ColorRange />
        </div>
      </div>
      <div className="justify-self-end">
        <CodeShelf />
      </div>
    </div>
  );
};

export default Palette;
