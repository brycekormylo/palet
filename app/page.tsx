"use client"

import Image from "next/image";
import ColorRange from "./(components)/color_range";
import ColorSelector from "./(components)/color_selector";
import NavBar from "./(components)/nav_bar";
import Palette from "./palette/page";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col min-w-full overflow-x-hidden">
      <NavBar />
      <div className="p-10 flex flex-col gap-10">
        <Palette />
        {/* <ColorRange></ColorRange> */}
      </div>
    </main>
  );
}
