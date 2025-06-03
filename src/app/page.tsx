import RouletteSlider from "../components/RouletteSlider";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/roulette", {
    cache: "no-store",
  });
  const testCells = await res.json();

  return (
    <main className="w-[100wh] h-[100vh] bg-[var(--dark-1)] ">
      <section className="py-4 ">
        <div className="w-[1440px] px-[1rem] mx-auto overflow-hidden ">
          <RouletteSlider cells={testCells?.sequence || []} />
        </div>
      </section>
      {/* <section className="input"></section> */}
      {/* <section className="result">Result Section</section> */}
    </main>
  );
}
