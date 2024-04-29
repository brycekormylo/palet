"use client";

import { useColorContext } from "@/contexts/project_context";
import { useState } from "react";
import { LuCode2 } from "react-icons/lu";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeShelf = () => {
  var hsl = require("hsl-to-hex");
  const { primary, neutral, accents } = useColorContext();
  const [isVisible, setVisible] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const [showButtonText, setShowButtonText] = useState(false);

  const toggleVisible = () => {
    setVisible(!isVisible);
  };
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
  const hues: [string, number][] = [
    ["L4", -28],
    ["L3", -24],
    ["L2", -18],
    ["L1", -10],
    ["N", 0],
    ["R1", 10],
    ["R2", 18],
    ["R3", 24],
    ["R4", 28],
  ];
  const hueRotations = [-20, -10, 0, 10, 20];

  const codeString = `
    theme: {
      extend: {
        colors: {
          'primary': {
            default: '${hsl(
              primary.hue,
              primary.saturation,
              primary.luminance
            )}',
            ${shadeKeys
              .map(
                (value, i) =>
                  `'${value}': '${hsl(
                    primary.hue,
                    (primary.saturation + lumSaturations[i]) / 2,
                    primary.luminance
                  ).toUpperCase()}'`
              )
              .join(",\n            ")}
            ${hues
              .map(
                (value, i) =>
                  `'${value[0]}': '${hsl(
                    primary.hue + value[1],
                    primary.saturation,
                    primary.luminance
                  ).toUpperCase()}'`
              )
              .join(",\n            ")}
          },
          'neutral': {
            default: '${hsl(
              neutral.hue,
              neutral.saturation,
              neutral.luminance
            )}',
            ${shadeKeys
              .map(
                (value, i) =>
                  `'${value}': '${hsl(
                    neutral.hue,
                    (neutral.saturation + lumSaturations[i]) / 2,
                    neutral.luminance
                  ).toUpperCase()}'`
              )
              .join(",\n            ")}
            ${hues
              .map(
                (value, i) =>
                  `'${value[0]}': '${hsl(
                    neutral.hue + value[1],
                    neutral.saturation,
                    neutral.luminance
                  ).toUpperCase()}'`
              )
              .join(",\n            ")}
          }
        }
      },
    },
  `;

  const handleMouseEnter = async () => {
    setHovered(true);
    await delay(200);
    setShowButtonText(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setShowButtonText(false);
  };

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

  return (
    <div className="[&_*]:transition-all [&_*]:ease-linear h-screen flex flex-row items-start justify-center">
      <div
        className={`h-12 flex flex-row-reverse px-[0.6rem] justify-between items-center mt-8 me-2 border-[2px] shadow-md shadow-slate-800 border-white/50 rounded-full ${isHovered ? "scale-[1.02] w-[8rem]" : "scale-[1.0] w-12"}`}
        onClick={toggleVisible}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          background: hsl(primary.hue, primary.saturation, primary.luminance),
        }}
      >
        <LuCode2 size={28} />
        <p className={`${showButtonText ? "opacity-100 block" : "opacity-0 hidden"} text-sm ps-1`}>{isVisible ? "Hide code" : "Show code"}</p>
      </div>
      <div className={`${isVisible ? "w-[20em]" : "w-0"} bg-black shadow-xl shadow-slate-800/25 border-2 border-white/15 rounded-tl-xl rounded-bl-xl my-4 ms-4`}>
        <SyntaxHighlighter
          language="javascript"
          style={dracula}
          customStyle={{
            lineHeight: "1.2",
            fontSize: "0.8em",
            background: "clear",
          }}
          codeTagProps={{
            style: {
              lineHeight: "inherit",
              fontSize: "inherit",
            },
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeShelf;
