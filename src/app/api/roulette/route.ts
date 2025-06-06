import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import buildCells from "../../../lib/buildCells";
import { rouletteSequence } from "../../../lib/rouletteSequence";

export async function GET() {
  const sequence = buildCells(rouletteSequence);

  if (sequence.length === 0) {
    return NextResponse.json({ error: "Empty roulette" }, { status: 500 });
  }

  const winnerIndex = Math.floor(Math.random() * sequence.length);

  return NextResponse.json({ sequence, winnerIndex });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { number, color } = body;
  } catch (error) {}
}
