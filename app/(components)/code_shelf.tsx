"use client";

import { useColorContext } from "@/contexts/project_context";
import { useState } from "react";
import { LuCode2 } from "react-icons/lu";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeShelf = () => {
  var hsl = require("hsl-to-hex");
  const { palette } = useColorContext();
  const [isVisible, setVisible] = useState(false);

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
              palette.primary.hue,
              palette.primary.saturation,
              palette.primary.luminance
            )}',
            ${shadeKeys
              .map(
                (value, i) =>
                  `'${value}': '${hsl(
                    palette.primary.hue,
                    (palette.primary.saturation + lumSaturations[i]) / 2,
                    palette.primary.luminance
                  ).toUpperCase()}'`
              )
              .join(",\n            ")}
            ${hues
              .map(
                (value, i) =>
                  `'${value[0]}': '${hsl(
                    palette.primary.hue + value[1],
                    palette.primary.saturation,
                    palette.primary.luminance
                  ).toUpperCase()}'`
              )
              .join(",\n            ")}
          }
        }
      },
    },
  `;

  return (
    <div className="[&_*]:transition-all [&_*]:ease-linear h-screen flex flex-row items-start justify-center">
      <div className="p-4" onClick={toggleVisible}>
        <LuCode2 size={24} />
      </div>
      <div
        className={`${
          isVisible ? "w-auto" : "w-0"
        } h-screen flex flex-col gap-0`}
        style={{
          background: hsl(palette.primary.hue, palette.primary.saturation, 10),
        }}
      >
        <SyntaxHighlighter
          language="javascript"
          style={dracula}
          showLineNumbers={true}
          customStyle={{
            lineHeight: "1",
            fontSize: "1em",
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
