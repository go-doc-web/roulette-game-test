import { CellColor } from "@/types";

export const ROULETTE_NUMBERS_MAP: Record<CellColor, number[]> = {
  green: [0],
  red: [1, 2, 3, 4, 5, 6, 7],
  black: [8, 9, 10, 11, 12, 13, 14],
  jockerBlack: [8, 9, 10, 11, 12, 13, 14],
  jockerRed: [1, 2, 3, 4, 5, 6, 7],
};

export function getDataBaseColor(
  cellColor: CellColor
): "red" | "black" | "green" {
  if (cellColor === "jockerBlack") return "black";
  if (cellColor === "jockerRed") return "red";

  return cellColor;
}

export function getRandomNumberForColor(color: CellColor): number | undefined {
  const possibleNumbers = ROULETTE_NUMBERS_MAP[color];
  if (possibleNumbers && possibleNumbers.length > 0) {
    return possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)];
  }

  return undefined;
}
