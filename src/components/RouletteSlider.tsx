"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
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

const cellWidth = 100;
const gap = 8;

export default function RouletteSlider({
  cells,
  winnerIndex,
  winner,
}: RouletteSliderProps) {
  const [xOffset, setXOffset] = useState<number>(0);

  const formatedCells = useMemo(() => {
    return [...cells, ...cells, ...cells, ...cells];
  }, [cells]);

  useEffect(() => {
    const visibleWidth = 1280;
    const totalCellWidth = cellWidth + gap;
    const winnerCellCenter = winnerIndex * totalCellWidth + cellWidth / 2;
    const targetOffset = winnerCellCenter - visibleWidth / 2;
    const extraSpins = cells.length * 2 * totalCellWidth;

    setXOffset(-(extraSpins + targetOffset));
  }, [winnerIndex, cells.length]);

  return (
    <div className=" w-full overflow-hidden ">
      <div className="absolute inset-y-0 left-1/2 w-1 border-l-8 h-6 border-yellow-300 z-10 "></div>
      <motion.ul
        className="flex gap-2 py-3 "
        initial={{ x: 0 }}
        animate={{ x: xOffset }}
        transition={{
          type: "spring",
          stiffness: 11.5,
          damping: 6.1,
          bounce: 0.2,
          duration: 8,
        }}
      >
        {formatedCells.map((cell, index) => {
          // const isWinner = cell.id === winner.id;
          return (
            <li
              key={`${Math.floor(index / cells.length)}-${cell.id}`}
              className={clsx(
                `rounded-[8px] flex items-center justify-center w-[100px] h-[100px] `
              )}
            >
              {iconMap[cell.color] ?? placeholderChips}
            </li>
          );
        })}
      </motion.ul>
    </div>
  );
}
