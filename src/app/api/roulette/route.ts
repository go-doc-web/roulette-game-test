import { NextResponse } from "next/server";
import { ROULETTE_COLORS, Cell } from "../../../types/index";

function generateRouletteSequence(count: number = 40): Cell[] {
  const result: Cell[] = [];

  for (let i = 0; i < count; i++) {
    const color =
      ROULETTE_COLORS[Math.floor(Math.random() * ROULETTE_COLORS.length)];
    result.push({ id: i, color });
  }

  return result;
}

export async function GET() {
  const sequence = generateRouletteSequence(40);

  return NextResponse.json({ sequence });
}
