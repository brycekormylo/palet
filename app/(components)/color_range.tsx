"use client";

import { Box, Slider } from "@mui/material";
import Swatch from "./swatch";
import { useState } from "react";

type Color = {
  hue: number;
  saturation: number;
  luminance: number;
};

const ColorRange = () => {
  const shadeKeys = [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ];
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [luminance, setLuminance] = useState(60);

  const handleHueChange = (event: Event, newHue: number | number[]) => {
    setHue(newHue as number);
  };
  const handleSaturationChange = (
    event: Event,
    newSaturation: number | number[]
  ) => {
    setSaturation(newSaturation as number);
  };
  const handleLuminanceChange = (
    event: Event,
    newLuminance: number | number[]
  ) => {
    setLuminance(newLuminance as number);
  };

  return (
    <div className="flex flex-col gap-4">
      <Box sx={{ width: 300 }}>
        <div className="flex flex-row gap-4">
          <p>Hue</p>
          <Slider
            aria-label="Hue"
            value={hue}
            min={0}
            max={360}
            onChange={handleHueChange}
          />
        </div>
        <div className="flex flex-row gap-4">
          <p>Saturation</p>
          <Slider
            aria-label="Saturation"
            value={saturation}
            min={0}
            max={10}
            onChange={handleSaturationChange}
          />
        </div>
        <div className="flex flex-row gap-4">
          <p>Luminance</p>
          <Slider
            aria-label="Luminance"
            value={luminance}
            min={0}
            max={100}
            onChange={handleLuminanceChange}
          />
        </div>
      </Box>
      <div className="flex flex-row gap-2">
        {shadeKeys.map((shadeKey, index) => (
          <div key={index} className="flex flex-col items-center">
            <Swatch
              color={`hsl(${hue},${index * saturation}%,${
                luminance / (shadeKeys.length - index)
              }%)`}
            ></Swatch>
            <p className="text-sm">{shadeKey}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorRange;
