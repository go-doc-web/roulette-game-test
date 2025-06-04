import RouletteSlider from "../components/RouletteSlider";
import fetchRouletteData from "../lib/api/fetchRouletteData";

export default async function Home() {
  const { sequence, winnerIndex, winner } = await fetchRouletteData();

  console.log("data", sequence[winnerIndex]);

  return (
    <main className="w-full h-[100vh]  ">
      <section className="py-4 ">
        <div
          className="w-[1280px]  mx-auto relative  z-30 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0  after:top-0
                 after:bg-[var(--bg-list)]"
        >
          <RouletteSlider
            cells={sequence}
            winnerIndex={winnerIndex}
            winner={winner}
          />
        </div>
      </section>
      {/* <section className="input"></section> */}
      {/* <section className="result">Result Section</section> */}
    </main>
  );
}
