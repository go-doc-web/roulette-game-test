import { NextResponse } from "next/server";
import buildCells from "../../../lib/buildCells";

export async function GET() {
  const sequence = buildCells();

  if (sequence.length === 0) {
    return NextResponse.json({ error: "Empty roulette" }, { status: 500 });
  }

  const winnerIndex = Math.floor(Math.random() * sequence.length);
  const winner = sequence[winnerIndex];

  return NextResponse.json({ sequence, winnerIndex, winner });
}
