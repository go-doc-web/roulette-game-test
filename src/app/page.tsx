import RouletteSlider from "../components/RouletteSlider";

export default async function Home() {
  const API_BASE_URL: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${API_BASE_URL}/api/roulette`, {
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
