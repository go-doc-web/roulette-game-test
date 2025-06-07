-- CreateTable
CREATE TABLE "GameRound" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameRound_pkey" PRIMARY KEY ("id")
);
