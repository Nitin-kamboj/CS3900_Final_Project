import frontImage from "../assets/frontImage.png";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});
function App() {
  return (
    <div className="w-full min-h-screen bg-black overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[80vh] md:h-screen overflow-hidden z-0">
        {/* Background Image with a Gradient Overlay to fade into the black section below */}
        <div className="absolute inset-0 z-0">
          <img
            src={frontImage}
            alt="Hero"
            className="w-full h-full object-cover block opacity-60"
          />
          {/* This gradient makes the bottom of the image blend into the next section */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        {/* Description Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 max-w-5xl space-y-6">
          <h1 className="text-6xl md:text-9xl font-black text-white italic tracking-tighter uppercase leading-[0.8]">
            IRONSHELL <span className="text-green-300">GYM</span>
          </h1>

          <div className="border-l-4 border-green-300 pl-6 space-y-2">
            <h3 className="text-2xl md:text-4xl font-extrabold text-gray-100 uppercase tracking-tight">
              Build your strength. Forge your body.
            </h3>
            <h3 className="text-sm md:text-xl font-bold text-gray-400 uppercase tracking-[0.3em]">
              The ultimate training ground for dedicated athletes
            </h3>
          </div>

          <div>
            <Link to="/plans">
              <button className="mt-4 px-10 py-4 bg-green-300 text-black font-black uppercase text-lg rounded-sm hover:bg-white transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-green-300/20">
                Join the Tribe
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* plans */}
      {/* <Plans/>
      <About/>
      <Contact/> */}
    </div>
  );
}

export default App;
