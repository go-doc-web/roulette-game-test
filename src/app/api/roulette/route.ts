import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
import buildCells from "../../../lib/buildCells";
import { rouletteSequence } from "../../../lib/rouletteSequence";
import {
  getRandomNumberForColor,
  getDataBaseColor,
} from "../../../lib/rouletteNumbersMap";

export async function GET() {
  try {
    const sequence = buildCells(rouletteSequence);

    if (sequence.length === 0) {
      return NextResponse.json({ error: "Empty roulette" }, { status: 500 });
    }

    const winnerIndex = Math.floor(Math.random() * sequence.length);
    const winningCell = sequence[winnerIndex];
    const winningCellColor = winningCell.color;

    const winningNumber = getRandomNumberForColor(winningCellColor);
    const winningColor = getDataBaseColor(winningCellColor);

    console.log("winningCell", winningCell);
    console.log("winningCellColor", winningCellColor);
    console.log("winningNumber", winningNumber);
    console.log("winningColor", winningColor);
    console.log({
      sequence,
      winnerIndex,
      winningNumber,
      winningColor,
    });
    return NextResponse.json({
      sequence,
      winnerIndex,
      winningNumber,
      winningColor,
    });
  } catch (error) {
    console.error(
      "[API /api/roulette/GET] Error processing roulette GET request:",
      error
    );
    return NextResponse.json(
      { error: "Failed to get roulette data" },
      { status: 500 }
    );
  }
}

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { number, color } = body;
//   } catch (error) {}
// }
