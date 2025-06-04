export const ROULETTE_COLORS = [
  "red",
  "black",
  "green",
  "jockerBlack",
  "jockerRed",
] as const;

export type CellColor = (typeof ROULETTE_COLORS)[number];

export type Cell = {
  id: string;
  color: CellColor;
};

export type WinnerIndex = number;

export interface RouletteSliderProps {
  cells: Cell[];
  winnerIndex: WinnerIndex;

  error?: string | null; // залишу поки так
}
