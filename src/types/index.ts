export const ROULETTE_COLORS = [
  "red",
  "black",
  "green",
  "jockerBlack",
  "jockerRed",
] as const;

export type CellColor = (typeof ROULETTE_COLORS)[number];

export type Cell = {
  id: number;
  color: CellColor;
};

export interface RouletteSliderProps {
  cells: Cell[];
  error?: string | null; // залишу поки так
}
