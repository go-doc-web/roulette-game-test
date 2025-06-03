"use client";
import React from "react";
import { animate, motion } from "framer-motion";
import clsx from "clsx";
import RedSvg from "./ui/RedSvg";
import BlackSvg from "./ui/BlackSvg";
import GreenSvg from "./ui/GreenSvg";
import JockerSvg from "./ui/JockerSvg";
import { RouletteSliderProps } from "../types";

const iconMap = {
  red: <RedSvg />,
  black: <BlackSvg />,
  green: <GreenSvg />,
  jockerBlack: <JockerSvg color="--dark-4" />,
  jockerRed: <JockerSvg color="--fishka-red" />,
};

const placeholderChips = (
  <div className="border-t-2 bg-yellow-500 border-solid border-white/20 w-[100px] h-[100px] flex items-center justify-center rounded-[0.5rem] text-red-500 text-3xl font-bold">
    ?
  </div>
);

export default function RouletteSlider({
  cells,
  winnerIndex,
}: RouletteSliderProps) {
  return (
    <div className="relative w-full  ">
      <div className="absolute inset-y-0 left-1/2 w-1 border-l-4 border-yellow-300 z-10"></div>
      <motion.ul
        className="flex gap-2 animate-none py-[8px]"
        initial={{ x: 0 }}
        animate={{ x: -1440 }}
        transition={{ duration: 5, ease: "easeInOut" }}
      >
        {cells.map((cell) => (
          <li
            key={cell.id}
            className={clsx(" rounded-[8px] flex items-center justify-center ")}
          >
            {iconMap[cell.color] ?? placeholderChips}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

/* overflow-hidden */
