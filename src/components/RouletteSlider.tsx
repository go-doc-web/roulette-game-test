"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import RedSvg from "./ui/RedSvg";
import BlackSvg from "./ui/BlackSvg";
import GreenSvg from "./ui/GreenSvg";
import JockerSvg from "./ui/JockerSvg";
import { RouletteSliderProps } from "../types";
import { useContainerWidth } from "@/hooks/useContainerWidth";
import { PULSE_ANIMATION_DURATION_MS } from "../constants/index";

const iconMap = {
  red: <RedSvg />,
  black: <BlackSvg />,
  green: <GreenSvg />,
  jockerBlack: <JockerSvg color="var(--dark-4)" />,
  jockerRed: <JockerSvg color="var(--fishka-red)" />,
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
  onFinish,
}: RouletteSliderProps) {
  const prevWinnerIndexRef = useRef<number | null>(null);

  const pulseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [animationProps, setAnimationProps] = useState<{
    initialX: number;
    targetX: number;
    key: number;
  }>({
    initialX: 0,
    targetX: 0,
    key: 0,
  });

  const [highlightedWinnerIndex, setHighlightedWinnerIndex] = useState<
    number | null
  >(null);
  const [containerRef, containerWidth] = useContainerWidth<HTMLDivElement>();

  const formatedCells = useMemo(() => {
    const repetitions = 10;
    let duplicatedCells: typeof cells = [];
    for (let i = 0; i < repetitions; i++) {
      duplicatedCells = duplicatedCells.concat(cells);
    }
    return duplicatedCells;
  }, [cells]);

  useEffect(() => {
    if (pulseTimeoutRef.current) {
      clearTimeout(pulseTimeoutRef.current);
      pulseTimeoutRef.current = null;
    }

    if (
      !cells.length ||
      winnerIndex === null ||
      winnerIndex === undefined ||
      containerWidth === 0
    ) {
      return;
    }

    if (winnerIndex === prevWinnerIndexRef.current) {
      return;
    }

    prevWinnerIndexRef.current = winnerIndex;
    setHighlightedWinnerIndex(null);

    const totalCellWidth = cellWidth + gap;
    const startRepetitionIndex = 3;
    const initialPositionOffset =
      cells.length * startRepetitionIndex * totalCellWidth;
    const newInitialXCalculated = -initialPositionOffset;
    const targetRepetitionIndex = 6;
    const winnerAbsoluteIndexInDuplicated =
      cells.length * targetRepetitionIndex + winnerIndex;
    const winnerCellCenterAbsolute =
      winnerAbsoluteIndexInDuplicated * totalCellWidth + cellWidth / 2;
    const newTargetXCalculated = -(
      winnerCellCenterAbsolute -
      containerWidth / 2
    );

    setAnimationProps((prev) => {
      return {
        initialX: newInitialXCalculated,
        targetX: newTargetXCalculated,
        key: prev.key + 1,
      };
    });

    return () => {
      if (pulseTimeoutRef.current) {
        clearTimeout(pulseTimeoutRef.current);
      }
    };
  }, [winnerIndex, cells.length, cells, containerWidth]);

  const handleRouletteAnimationComplete = () => {
    setHighlightedWinnerIndex(winnerIndex);

    const totalPulseDuration = 500 + PULSE_ANIMATION_DURATION_MS;

    pulseTimeoutRef.current = setTimeout(() => {
      setHighlightedWinnerIndex(null);
      if (onFinish) {
        onFinish();
      }
      pulseTimeoutRef.current = null;
    }, totalPulseDuration);
  };

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div className="absolute inset-y-0 left-1/2 w-1 border-l-8 h-6 border-yellow-300 z-10 -translate-x-1/2"></div>
      <motion.ul
        key={animationProps.key}
        className="flex gap-2 py-3"
        initial={{ x: animationProps.initialX }}
        animate={{ x: animationProps.targetX }}
        transition={{
          type: "spring",
          stiffness: 9,
          damping: 5.6,
          bounce: 0.2,
          mass: 1.1,
          duration: 5,
        }}
        onAnimationComplete={handleRouletteAnimationComplete}
      >
        {formatedCells.map((cell, index) => {
          const isWinnerCell = index % cells.length === highlightedWinnerIndex;
          return (
            <motion.li
              key={`${cell.id}-${index}`}
              className={clsx(
                `rounded-[8px] flex items-center justify-center w-[100px] h-[100px]`
              )}
              style={{ flexShrink: 0 }}
              animate={
                isWinnerCell ? { scale: [1, 1.15, 1.15, 1] } : { scale: 1 }
              }
              transition={
                isWinnerCell
                  ? {
                      delay: 0.5,
                      duration: PULSE_ANIMATION_DURATION_MS / 1000,
                      ease: "linear",
                      times: [0, 0.2, 0.9, 1],
                    }
                  : { duration: 0.1 }
              }
            >
              {iconMap[cell.color] ?? placeholderChips}
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}
