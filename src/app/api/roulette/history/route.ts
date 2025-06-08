import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { GameRoundRecord } from "../../../../types/index";

const MAX_WINNERS_COUNT = 100;

export async function GET() {
  try {
    const rawWinners = await prisma.gameRound.findMany({
      orderBy: {
        timestamp: "desc",
      },
      take: MAX_WINNERS_COUNT,
      select: {
        id: true,
        number: true,
        color: true,
        originalColor: true,
        timestamp: true,
      },
    });
    const winners: GameRoundRecord[] = rawWinners.map((winner) => ({
      ...winner,
      color: winner.color as "red" | "black" | "green",
      originalColor: winner.originalColor as GameRoundRecord["originalColor"],
      timestamp: winner.timestamp.toISOString(),
    }));
    return NextResponse.json({ winners });
  } catch (error) {
    console.error(
      "[API /api/roulette/history/GET] Error fetching roulette history:",
      error
    );
    return NextResponse.json(
      { error: "Failed to fetch roulette history" },
      { status: 500 }
    );
  }
}
