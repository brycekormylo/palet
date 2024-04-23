import { Slider } from "@mui/material";
import { useState, useEffect } from "react";
import Swatch from "./swatch";
import { SelectedColor, useColorContext } from "@/contexts/project_context";

const ColorSelector = () => {
  const {
    palette,
    current,
    selected,
    accentIndex,
    setAccentIndex,
    addAccent,
    setAccents,
    setNeutral,
    setPrimary,
  } = useColorContext();

  useEffect(() => {
    setHue(current.hue);
    setSaturation(current.saturation);
    setLuminance(current.luminance);
  }, [current]);

  const swapSelectedColor = () => {
    switch (selected) {
      case SelectedColor.Primary: {
        setPrimary({ hue: hue, saturation: saturation, luminance: luminance });
      }
      case SelectedColor.Neutral: {
        setNeutral({ hue: hue, saturation: saturation, luminance: luminance });
      }
      case SelectedColor.Accents: {
        const newAccents = [...(palette.accents ?? [])];
        newAccents[accentIndex] = {
          hue: hue,
          saturation: saturation,
          luminance: luminance,
        };
        setAccents(newAccents);
      }
    }
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
          <p className="text-sm">
            {hsl(hue, saturation, luminance).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;
