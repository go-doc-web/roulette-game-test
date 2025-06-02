import RouletteSlider from "@/components/RouletteSlider";
import { Cell, ROULETTE_COLORS } from "../types/index";

const testCells: Cell[] = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  color: ROULETTE_COLORS[i % ROULETTE_COLORS.length],
}));

export default function Home() {
  return (
    <main className="w-[100wh] h-[100vh] bg-[var(--dark-1)] ">
      <section className="py-4 ">
        <div className="w-[1440px] px-[1rem] mx-auto overflow-hidden ">
          <RouletteSlider cells={testCells} />
        </div>
      </section>
      {/* <section className="input"></section> */}
      {/* <section className="result">Result Section</section> */}
    </main>
  );
}
