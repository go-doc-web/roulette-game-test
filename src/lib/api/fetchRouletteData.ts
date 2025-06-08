import {
  Cell,
  GameRoundRecord,
  RouletteApiResponse,
  CellColor,
} from "../../types/index";

const API_BASE_URL: string | undefined =
  process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default async function fetchRouletteData(): Promise<RouletteApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/roulette`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch roulette data. Status: ${res.status}`);
    }
    const data = await res.json();

    const sequence: Cell[] = (data?.sequence as Cell[]) || [];
    const winnerIndex = data?.winnerIndex;
    const winningNumber = data?.winningNumber;
    const winningColor = data?.winningColor;
    const winningCellColor = data?.winningCellColor;

    return {
      sequence,
      winnerIndex,
      winningNumber,
      winningColor,
      winningCellColor,
      error: null,
    };
  } catch (error) {
    console.error("Error in fetchRouletteData:", error);
    throw error;
  }
}

export async function postGameRoundResult(
  number: number,
  color: "red" | "black" | "green",
  originalColor: CellColor
): Promise<GameRoundRecord> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/roulette`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number, color, originalColor }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to post game round result");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in postGameRoundResult:", error);
    throw error;
  }
}
