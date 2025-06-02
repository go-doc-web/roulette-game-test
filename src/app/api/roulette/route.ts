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

  if (sequence.length === 0) {
    return NextResponse.json({ error: "Empty roulette" }, { status: 500 });
  }

  const winnerIndex = Math.floor(Math.random() * sequence.length);
  const winner = sequence[winnerIndex];

  // console.log({ sequence, winnerIndex, winner });

  return NextResponse.json({ sequence, winnerIndex, winner });
}
