import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
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

    return NextResponse.json({
      sequence,
      winnerIndex,
      winningNumber,
      winningColor,
      winningCellColor,
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

export async function POST(request: Request) {
  try {
    const { number, color, originalColor } = await request.json();
    if (
      typeof number !== "number" ||
      number < 0 ||
      number > 14 ||
      typeof color !== "string" ||
      !["green", "red", "black"].includes(color) ||
      typeof originalColor !== "string" ||
      !["green", "red", "black", "jockerBlack", "jockerRed"].includes(
        originalColor
      )
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid data provided. Number must be 0-14, color must be "green", "red", or "black".',
        },
        { status: 400 }
      );
    }

    // Save gameRound to base

    const newGameRound = await prisma.gameRound.create({
      data: {
        number,
        color,
        originalColor,
      },
    });

    //Garbage Collection
    const maxRecords = 500;
    const count = await prisma.gameRound.count();
    if (count > maxRecords) {
      const recordsToDelete = count - maxRecords;

      const oldestRecords = await prisma.gameRound.findMany({
        orderBy: {
          timestamp: "asc",
        },
        take: recordsToDelete,
        select: { id: true },
      });

      await prisma.gameRound.deleteMany({
        where: {
          id: {
            in: oldestRecords.map((record: { id: string }) => record.id),
          },
        },
      });
      console.log(
        `[API /api/roulette] Deleted ${oldestRecords.length} old game rounds to maintain limit of ${maxRecords}.`
      );
    }
    return NextResponse.json(newGameRound, { status: 201 });
  } catch (error) {
    console.error("[API /api/roulette] Error saving game round:", error);
    return NextResponse.json(
      { error: "Failed to save game round due to a server error." },
      { status: 500 }
    );
  }
}
