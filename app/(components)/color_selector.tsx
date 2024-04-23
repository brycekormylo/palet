import { Slider } from "@mui/material";
import { useState, useEffect } from "react";
import Swatch from "./swatch";
import { useColorContext } from "@/contexts/project_context";

const ColorSelector = () => {
  const { colors, setNewColors, index, setIndex } = useColorContext();

  useEffect(() => {
    setHue(colors[index].hue);
    setSaturation(colors[index].saturation);
    setLuminance(colors[index].luminance);
  }, [colors, index]);

  const swapSelectedColor = () => {
    const newColors = [...colors];
    newColors[index] = {
      hue: hue,
      saturation: saturation,
      luminance: luminance,
    };
    setNewColors(newColors);
  };

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
  var hsl = require("hsl-to-hex");

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
    <div className="flex flex-row gap-4 py-4">
      <div
        className="flex flex-row rounded-2xl"
        style={{
          background: hsl(hue, saturation, luminance),
        }}
      >
        <div className={`w-[400px] p-2 rounded-xl flex flex-col`}>
          <div
            className={`p-4 rounded-lg flex flex-col`}
            style={{
              background: hsl(0, 0, 0),
            }}
          >
            <div className="flex flex-row items-center gap-4">
              <p>H</p>
              <Slider
                aria-label="Hue"
                value={hue}
                min={0}
                max={360}
                onChange={handleHueChange}
                onChangeCommitted={swapSelectedColor}
              />
              <p>{hue}</p>
            </div>
            <div className="flex flex-row items-center gap-4">
              <p>S</p>
              <Slider
                aria-label="Saturation"
                value={saturation}
                min={0}
                max={100}
                onChange={handleSaturationChange}
                onChangeCommitted={swapSelectedColor}
              />
              <p>{saturation}</p>
            </div>
            <div className="flex flex-row items-center gap-4">
              <p>L</p>
              <Slider
                aria-label="Luminance"
                value={luminance}
                min={0}
                max={100}
                onChange={handleLuminanceChange}
                onChangeCommitted={swapSelectedColor}
              />
              <p>{luminance}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 p-2 pe-4">
          <p className="text-sm">{`hsl(${hue},${saturation}%,${luminance}%)`}</p>
          <p className="text-sm">{hsl(hue, saturation, luminance).toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;
