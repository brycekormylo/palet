"use client";

import { useState } from "react";

type SwatchProps = {
  hex: string;
  shadeKey?: string;
};

const Swatch = (props: SwatchProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseEntered = () => {
    setIsHovered(true);
  };
  const mouseExited = () => {
    setIsHovered(false);
  };
  return (
    <div className="flex flex-col [&_*]:transition-all [&_*]:ease-linear">
      <div
        className={`z-10 h-20 w-20 rounded-md flex justify-center items-center`}
        style={{
          background: `${props.hex}`,
        }}
        onMouseEnter={mouseEntered}
        onMouseLeave={mouseExited}
      >
        <p
          className={`${
            isHovered ? "block" : "hidden"
          } text-xs bg-black/25 rounded-sm py-1 px-2 m-1`}
        >
          {`${props.hex}`.toUpperCase()}
        </p>
      </div>
      <div className={`flex flex-col items-center text-xs`}>
        <p className={`${props.shadeKey ? "block" : "hidden"} m-1`}>
          {props.shadeKey}
        </p>
      </div>
    </div>
  );
};

export default Swatch;
