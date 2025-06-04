"use client";
import { useState, useEffect, useRef } from "react";
import RouletteSlider from "../components/RouletteSlider";
import fetchRouletteData from "../lib/api/fetchRouletteData";
import { Cell } from "@/types";

export default function Home() {
  const [cells, setCells] = useState<Cell[]>([]);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);

  const loadData = async () => {
    const { sequence, winnerIndex } = await fetchRouletteData();
    setCells(sequence);
    setWinnerIndex(winnerIndex);
  };

  useEffect(() => {
    loadData();

    const intervalId = setInterval(() => {
      loadData();
    }, 15000); // 60 сек

    return () => clearInterval(intervalId); // Очистка таймера при размонтировании
  }, []);

  if (!cells.length || winnerIndex === null) {
    return <p className="text-white text-center mt-10">Загрузка рулетки...</p>;
  }

  return (
    <main className="w-full h-[100vh]  ">
      <section className="py-4 ">
        <div
          className="w-[1280px]  mx-auto relative  z-30 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0  after:top-0
                 after:bg-[var(--bg-list)]"
        >
          <RouletteSlider cells={cells} winnerIndex={winnerIndex} />
        </div>
      </section>
      {/* <section className="input"></section> */}
      {/* <section className="result">Result Section</section> */}
    </main>
  );
}
