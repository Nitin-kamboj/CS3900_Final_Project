import aboutimage from "../assets/about-image1.png";
import trainersimage from "../assets/trainers.png";

export function About() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative py-20 px-6 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
              WHO WE <span className="text-green-300">ARE</span>
            </h1>
            <p className="mt-8 text-zinc-400 text-lg uppercase font-bold leading-relaxed max-w-xl">
              At IronShell, we don't do "easy." We provide the environment, the 
              equipment, and the elite coaching required to break your physical 
              limits. This isn't a health club—it's a forge.
            </p>
            <div className="mt-10 flex gap-4">
               <div className="bg-zinc-900 p-4 border-l-4 border-green-300">
                  <span className="block text-3xl font-black italic">10+</span>
                  <span className="text-xs uppercase text-zinc-500 font-bold">Years Experience</span>
               </div>
               <div className="bg-zinc-900 p-4 border-l-4 border-green-300">
                  <span className="block text-3xl font-black italic">500+</span>
                  <span className="text-xs uppercase text-zinc-500 font-bold">Active Warriors</span>
               </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-1 bg-green-300 opacity-20 blur-2xl"></div>
            <img 
              src={aboutimage} 
              alt="Gym Interior" 
              className="relative rounded-sm grayscale hover:grayscale-0 transition-all duration-700 border border-zinc-800"
            />
          </div>
        </div>
      </section>

      {/* --- TRAINERS SECTION --- */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
               <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
                THE <span className="text-green-300 underline decoration-4 underline-offset-8">ELITE</span>
               </h2>
               <p className="text-zinc-500 mt-4 uppercase font-black tracking-widest text-sm">
                Our Trainers are certified lifestyle architects
               </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-zinc-900/30 p-4 rounded-sm border border-zinc-800/50">
            <img 
              src={trainersimage} 
              alt="Our Trainers" 
              className="w-full h-full object-cover rounded-sm border border-zinc-800 md:skew-x-[-2deg]"
            />
            <div className="p-8">
              <h3 className="text-3xl font-black italic uppercase text-green-300">Unmatched Expertise</h3>
              <p className="mt-6 text-zinc-400 leading-relaxed font-medium">
                Our trainers aren't just here to count reps. They specialize in 
                biomechanics, powerlifting, and professional athletic conditioning. 
                Whether you're stepping onto the stage or just stepping off the couch, 
                we ensure every drop of sweat counts.
              </p>
              <ul className="mt-8 space-y-4">
                {['Olympic Weightlifting', 'HIIT Specialist', 'Nutrition Coaching'].map((skill) => (
                  <li key={skill} className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-zinc-300">
                    <span className="h-2 w-2 bg-green-300 rotate-45"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}