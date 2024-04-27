"use client";

import { useColorContext } from "@/contexts/project_context";
import { useEffect, useState } from "react";
import Swatch from "./swatch";

const ColorRange = () => {
  const { current } = useColorContext();
  const shadeKeys = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
  ];
  const lums = [96, 90, 84, 76, 62, 50, 38, 24, 16, 10, 4];
  const lumSaturations = [100, 95, 90, 85, 80, 75, 80, 85, 90, 95, 100];
  const sats = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const hues = [-28, -24, -18, -10, 0, 10, 18, 24, 28];
  const hueRotations = [-20, -10, 0, 10, 20];
  var hsl = require("hsl-to-hex");

  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [luminance, setLuminance] = useState(60);

  useEffect(() => {
    setHue(current.hue);
    setSaturation(current.saturation);
    setLuminance(current.luminance);
  }, [current]);

  return (
    <div className=" [&_*]:transition-all [&_*]:ease-linear flex flex-col gap-4">
      <p className="text-xl text-white">Hue Shifts</p>
      <div className="flex flex-row gap-2">
        {hueRotations.map((hue, i) => (
          <Swatch
            key={i}
            hex={hsl(current.hue + hue, saturation, luminance)}
            shadeKey={`${hueRotations[i]}`}
          />
        ))}
      </div>
      <p className="text-xl text-white">Advanced Hue Shifts</p>
      <div className="flex flex-row gap-2">
        {hues.map((hue, i) => (
          <Swatch
            key={i}
            hex={hsl(current.hue + hue, saturation, luminance)}
            shadeKey={`${hues[i]}`}
          />
        ))}
      </div>
      <p className="text-xl text-white">Hue Shades</p>
      <div className="flex flex-row gap-2">
        {lums.map((lum, i) => (
          <Swatch
            key={i}
            hex={hsl(
              hue,
              (lumSaturations[i] + saturation) / 2,
              lum - 50 + luminance
            )}
            shadeKey={shadeKeys[i]}
          />
        ))}
      </div>
      <p className="text-xl text-white">Saturation Range</p>
      <div className="flex flex-row gap-2">
        {sats.map((sat, i) => (
          <Swatch
            key={i}
            hex={hsl(hue, sat, luminance)}
            shadeKey={`${sats[i]}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorRange;
