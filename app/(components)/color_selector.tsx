import { Slider } from "@mui/material";
import { useState, useEffect } from "react";
import { useColorContext } from "@/contexts/project_context";

const ColorSelector = () => {
  const { current, swapSelectedColor } = useColorContext();

  useEffect(() => {
    setHue(current.hue);
    setSaturation(current.saturation);
    setLuminance(current.luminance);
  }, [current]);

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
  const handleSubmitChange = () =>
    swapSelectedColor({
      hue: hue,
      saturation: saturation,
      luminance: luminance,
    });

  return (
    <div className="flex flex-row">
      <div
        className="flex flex-row rounded-3xl"
        style={{
          background: hsl(hue, saturation, luminance),
        }}
      >
        <div
          className={`w-[400px] rounded-l-2xl flex flex-col p-4`}
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
              onChangeCommitted={handleSubmitChange}
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
              onChangeCommitted={handleSubmitChange}
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
              onChangeCommitted={handleSubmitChange}
            />
            <p>{luminance}</p>
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
