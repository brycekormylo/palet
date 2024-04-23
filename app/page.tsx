"use client";

import Image from "next/image";
import ColorRange from "./(components)/color_range";
import ColorSelector from "./(components)/color_selector";
import NavBar from "./(components)/nav_bar";
import Palette from "./palette/page";
import CodeShelf from "./(components)/code_shelf";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row-reverse justify-between min-w-full overflow-x-hidden">
      <CodeShelf />
      <div className="flex flex-col">
        <div className="flex flex-row gap-4 justify-end items-center">
          <NavBar />
        </div>
        <div className="p-10 flex flex-col gap-10">
          <Palette />
          {/* <ColorRange></ColorRange> */}
        </div>
      </div>
    </main>
  );
}
