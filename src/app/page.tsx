import { RouletteSlider } from "@/componets/RouletteSlider";
import { Cell, ROULETTE_COLORS } from "../types/index";

const testCells: Cell[] = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  color: ROULETTE_COLORS[i % ROULETTE_COLORS.length],
}));

export default function Home() {
  return (
    <main className="w-full h-[100vh] bg-[var(--dark-1)]">
      <div className="w-[92rem]  px-[1rem] m-auto">
        <section className="bet">Bet display</section>
        <section className="w-full my-[2rem]">
          <RouletteSlider cells={testCells} />
        </section>
        <section className="input"></section>
        <section className="result">Result Section</section>
      </div>
    </main>
  );
}
