"use client";
import { useState, useEffect, useRef } from "react";
import RouletteSlider from "../components/RouletteSlider";
import fetchRouletteData from "../lib/api/fetchRouletteData";
import {
  ROULETTE_UPDATE_INTERVAL_MS,
  ROULETTE_CONTAINER_MAX_WIDTH_PX,
} from "../constants";
import { Cell } from "@/types";

export default function Home() {
  const [cells, setCells] = useState<Cell[]>([]);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const loadData = async () => {
    if (cells.length === 0 && winnerIndex === null) {
      setIsLoading(true);
    }
    setError(null);
    try {
      const { sequence, winnerIndex } = await fetchRouletteData();
      setCells(sequence);
      setWinnerIndex(winnerIndex);
    } catch (err) {
      console.error("Failed to fetch roulette data:", err);
      setError("Failed to load roulette data. Please try again later.");
      setIsLoading(false);
    } finally {
      if (isLoading === true || (cells.length > 0 && winnerIndex !== null)) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadData();
    intervalIdRef.current = setInterval(() => {
      loadData();
    }, ROULETTE_UPDATE_INTERVAL_MS);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  if (isLoading && (!cells.length || winnerIndex === null)) {
    return <p className="text-white text-center mt-10">Loading...</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }
  if (!cells.length || winnerIndex === null) {
    return (
      <p className="text-white text-center mt-10">Roulette data unavailable.</p>
    );
  }

  return (
    <main className="w-full h-[100vh] ">
      <section className="py-4 ">
        <div
          className={` mx-auto relative z-30 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0  after:top-0
                 after:bg-[var(--bg-list)]`}
          style={{ width: ROULETTE_CONTAINER_MAX_WIDTH_PX }}
        >
          <RouletteSlider cells={cells} winnerIndex={winnerIndex} />
        </div>
      </section>
      {/* <section className="input"></section> */}
      {/* <section className="result">Result Section</section> */}
    </main>
  );
}
