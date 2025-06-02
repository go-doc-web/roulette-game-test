"use client";
import React from "react";
import clsx from "clsx";
import RedSvg from "./ui/RedSvg";
import BlackSvg from "./ui/BlackSvg";
import GreenSvg from "./ui/GreenSvg";
import { RouletteSliderProps } from "../types/";

const colorMap = {
  red: <RedSvg />,
  black: <BlackSvg />,
  green: <GreenSvg />,
  jocker: <GreenSvg />,
};

export const RouletteSlider: React.FC<RouletteSliderProps> = ({ cells }) => {
  return (
    <div className="relative w-full overflow-hidden ">
      <div className="absolute inset-y-0 left-1/2 w-1 border-l-4 border-yellow-300 z-10"></div>
      <ul className="flex gap-2 animate-none">
        {cells.map((cell) => (
          <li
            key={cell.id}
            className={clsx(
              "w-full rounded-[8px] flex items-center justify-center "
            )}
          >
            {colorMap[cell.color]}
          </li>
        ))}
      </ul>
    </div>
  );
};
