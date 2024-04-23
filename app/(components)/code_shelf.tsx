"use client";

import { useColorContext } from "@/contexts/project_context";
import { useState } from "react";
import { LuCode2 } from "react-icons/lu";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeShelf = () => {
  var hsl = require("hsl-to-hex");
  const { colors, index } = useColorContext();
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
              colors[index].hue,
              colors[index].saturation,
              colors[index].luminance
            )}',
            ${shadeKeys
              .map(
                (value, i) =>
                  `'${value}': '${hsl(
                    colors[index].hue,
                    (colors[index].saturation + lumSaturations[i]) / 2,
                    colors[index].luminance
                  ).toUpperCase()}'`
              )
              .join(",\n            ")}
            ${hues
              .map(
                (value, i) =>
                  `'${value[0]}': '${hsl(
                    colors[index].hue + value[1],
                    colors[index].saturation,
                    colors[index].luminance
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
          isVisible ? "w-[32rem]" : "w-0"
        } bg-gray-900 h-screen flex flex-col gap-0`}
        style={{
          background: hsl(colors[index].hue, colors[index].saturation, 10),
        }}
      >
        <SyntaxHighlighter
          language="javascript"
          style={docco}
          showLineNumbers={true}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeShelf;
