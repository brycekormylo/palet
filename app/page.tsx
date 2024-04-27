"use client";

import Image from "next/image";
import ColorRange from "./(components)/color_range";
import ColorSelector from "./(components)/color_selector";
import NavBar from "./(components)/nav_bar";
import Palette from "./palette/page";
import CodeShelf from "./(components)/code_shelf";
import { useColorContext } from "@/contexts/project_context";

export default function Home() {
  let hsl = require("hsl-to-hex");
  const { primary, neutral } = useColorContext();

  return (
    <main
      className="flex items-end justify-end max-w-screen"
      style={{
        background: hsl(primary.hue, primary.saturation, primary.luminance),
      }}
    >
      <div
        className="rounded-tl-3xl mt-6 ms-10 w-full"
        style={{
          background: hsl(neutral.hue, neutral.saturation, neutral.luminance),
        }}
      >
        <Palette />
      </div>
    </main>
  );
}
