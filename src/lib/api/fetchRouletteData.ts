import { Cell } from "../../types/index";

interface FetchRouletteResult {
  sequence: Cell[];
  winnerIndex: number | null;
  error: string | null;
}

const API_BASE_URL: string | undefined =
  process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default async function fetchRouletteData(): Promise<FetchRouletteResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/roulette`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch roulette data. Status: ${res.status}`);
    }
    const data = await res.json();
    console.log("data", data);
    const sequence: Cell[] = (data?.sequence as Cell[]) || [];
    const winnerIndex = data?.winnerIndex;

    return { sequence, winnerIndex, error: null };
  } catch (err: unknown) {
    console.error("Failed to fetch roulette data:", err);

    let errorMessage: string;

    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === "string") {
      errorMessage = err;
    } else {
      errorMessage = "Failed to load roulette. Please try again later.";
    }
    return {
      sequence: [],
      winnerIndex: null,
      error: errorMessage,
    };
  }
}
