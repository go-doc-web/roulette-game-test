"use client";
import { useState, useEffect, useRef } from "react";
import RouletteSlider from "../components/RouletteSlider";
import DivContainer from "@/components/DivContainer";
import Button from "@/components/Button";
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
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [audioAllowed, setAudioAllowed] = useState<boolean>(false);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const loadData = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setIsRolling(false);
    setShowProgress(false);

    try {
      const { sequence, winnerIndex: newWinnerIndex } =
        await fetchRouletteData();

      setCells(sequence);
      setWinnerIndex(newWinnerIndex);
    } catch (err) {
      console.error("Home: Failed to fetch roulette data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpinFinish = (number: number, color: string) => {
    setIsRolling(false);
    setShowProgress(true);

    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    console.log("number", number);
    console.log("color", color);

    updateTimeoutRef.current = setTimeout(() => {
      loadData();
      updateTimeoutRef.current = null;
    }, ROULETTE_UPDATE_INTERVAL_MS);
  };

  const safePlayAudio = () => {
    if (audioEnabled && audioAllowed && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => {
        console.error("Error playing sound:", e);
      });
    }
  };

  useEffect(() => {
    if (!cells.length && winnerIndex === null && !isLoading && !error) {
      loadData();
    }

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cells.length > 0 && winnerIndex !== null && isLoading === false) {
      setIsRolling(true);
      setShowProgress(false);
    }

    safePlayAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cells, winnerIndex, isLoading]);

  useEffect(() => {
    const handleIteraction = () => {
      setAudioAllowed(true);
    };
    window.addEventListener("click", handleIteraction, { once: true });
    return () => {
      window.removeEventListener("click", handleIteraction);
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
      <DivContainer
        width={ROULETTE_CONTAINER_MAX_WIDTH_PX}
        className="pt-4 mx-auto"
      >
        <Button
          onClick={() => setAudioEnabled((prev) => !prev)}
          className="cursor-pointer py-1 px-2 rounded-sm text-stone-200 bg-[#000] block "
          type="button"
        >
          {audioEnabled ? "🔊" : "🔇"}
        </Button>
      </DivContainer>
      <audio ref={audioRef} src="/sounds/blink.mp3" preload="auto" />
      <section className="py-4 ">
        <div
          className={`mx-auto relative z-30 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0
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
          <div className="absolute inset-0 bg-[var(--bg-mask)] pointer-events-none z-10"></div>
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
