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

export interface RouletteApiResponse {
  sequence: Cell[];
  winnerIndex: WinnerIndex;
  winningNumber: number;
  winningColor: "red" | "black" | "green";
  error: string | null;
}

export interface GameRoundRecord {
  id: string;
  number: number;
  color: "red" | "black" | "green";
  timestamp: string;
}

export type WinnerIndex = number;

export interface RouletteSliderProps {
  cells: Cell[];
  winnerIndex: WinnerIndex;
  winningNumber: number | null;
  winningColor: "red" | "black" | "green" | null;
  // onFinish?: () => void;
  onFinish?: (
    winningNumber: number,
    winningColor: "red" | "black" | "green"
  ) => void;
  error?: string | null; // залишу поки так
}
