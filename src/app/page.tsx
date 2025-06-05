// app/page.tsx
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
  const [isRolling, setIsRolling] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const loadData = async (): Promise<void> => {
    console.log("Home: loadData called. Setting isLoading(true)."); // Лог для відладки
    setIsLoading(true);
    setError(null);
    setIsRolling(false);
    setShowProgress(false);

    try {
      const { sequence, winnerIndex: newWinnerIndex } =
        await fetchRouletteData();
      console.log(
        "Home: Data fetched successfully. New winnerIndex:",
        newWinnerIndex
      ); // Лог для відладки
      setCells(sequence);
      setWinnerIndex(newWinnerIndex);
    } catch (err) {
      console.error("Home: Failed to fetch roulette data:", err); // Лог помилок
      setError("Failed to load roulette data. Please try again later.");
    } finally {
      // ЗМІНА: Завжди скидаємо `isLoading` після спроби завантаження (успішної або невдалої).
      // Це гарантує, що `useEffect` для запуску анімації отримає коректний стан.
      setIsLoading(false);
      console.log("Home: loadData finished. Setting isLoading(false)."); // Лог для відладки
    }
  };

  const handleSpinFinish = () => {
    console.log(
      "Home: handleSpinFinish called (RouletteSlider animation complete)."
    ); // Лог для відладки
    setIsRolling(false);
    setShowProgress(true);

    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
      console.log("Home: Cleared previous update timeout."); // Лог для відладки
    }

    console.log(
      "Home: Setting new update timeout for",
      ROULETTE_UPDATE_INTERVAL_MS,
      "ms."
    ); // Лог для відладки

    updateTimeoutRef.current = setTimeout(() => {
      console.log(
        "Home: Update timeout triggered. Calling loadData for next round."
      ); // Лог для відладки
      loadData();
      updateTimeoutRef.current = null;
    }, ROULETTE_UPDATE_INTERVAL_MS);
  };

  useEffect(() => {
    console.log("Home useEffect [] for initial load. Checking initial state."); // Лог для відладки

    if (!cells.length && winnerIndex === null && !isLoading && !error) {
      console.log("Home: Initial load condition met. Calling loadData."); // Лог для відладки
      loadData();
    }

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
        console.log("Home: Cleared update timeout on unmount."); // Лог для відладки
      }
    };
  }, []);

  useEffect(() => {
    console.log("Home useEffect [cells, winnerIndex, isLoading] triggered."); // Лог для відладки
    console.log(
      "  cells.length:",
      cells.length,
      "winnerIndex:",
      winnerIndex,
      "isLoading:",
      isLoading
    ); // Лог для відладки

    // Запускаємо анімацію рулетки тільки якщо у нас є дані, переможець визначений,
    // і ми НЕ перебуваємо в процесі активного завантаження (`isLoading === false`).
    // Це запобігає запуску анімації, поки дані ще не готові або ще завантажуються.
    if (cells.length > 0 && winnerIndex !== null && isLoading === false) {
      console.log(
        "Home: Data ready and loaded. Setting isRolling(true), setShowProgress(false)."
      ); // Лог для відладки
      setIsRolling(true);
      setShowProgress(false);
    }
  }, [cells, winnerIndex, isLoading]); // ЗМІНА: Залежимо від `cells`, `winnerIndex` та `isLoading`.

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
          className={`mx-auto relative z-30 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0  after:top-0
                     after:bg-[var(--bg-list)] ${
                       showProgress ? "progress-animate" : ""
                     }`}
          style={
            {
              width: ROULETTE_CONTAINER_MAX_WIDTH_PX,

              "--progress-width": showProgress ? "100%" : "0%",
              "--progress-duration": `${ROULETTE_UPDATE_INTERVAL_MS / 1000}s`,
              opacity: isRolling ? 1 : 0.8,
              transition: "opacity 0.3s ease-in-out",
            } as React.CSSProperties
          }
        >
          <RouletteSlider
            cells={cells}
            winnerIndex={winnerIndex}
            onFinish={handleSpinFinish}
          />
        </div>
      </section>

      {/* <section className="input"></section> */}
      {/* <section className="result">Result Section</section> */}
    </main>
  );
}
