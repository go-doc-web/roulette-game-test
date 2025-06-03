import RouletteSlider from "../components/RouletteSlider";
import fetchRouletteData from "../lib/api/fetchRouletteData";

export default async function Home() {
  const { sequence } = await fetchRouletteData();

  return (
    <main className="w-[100wh] h-[100vh] bg-[var(--dark-1)] ">
      <section className="py-4 ">
        <div className="w-[1440px] px-[1rem] mx-auto overflow-hidden ">
          <RouletteSlider cells={sequence} />
        </div>
      </section>
      {/* <section className="input"></section> */}
      {/* <section className="result">Result Section</section> */}
    </main>
  );
}
