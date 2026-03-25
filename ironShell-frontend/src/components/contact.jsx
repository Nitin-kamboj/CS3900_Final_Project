import { useState } from "react";

export function Contact() {
  const [loading, setLoading] = useState(false);
  async function onSubmitHandler(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        interest: e.target.interest.value,
        description: e.target.description.value,
      };
      console.log(formData);

      const response = await fetch("http://localhost:3000/api/contactUs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Server error");

      e.target.reset();
      alert("Message sent!");
    } catch (err) {
      alert("Failed to send message. Please try again." + err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* --- HEADER --- */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">
            GET IN <span className="text-green-300">TOUCH</span>
          </h1>
          <p className="mt-6 text-zinc-500 font-black tracking-[0.3em] uppercase text-sm">
            No excuses. Just answers.
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT SIDE: INFO */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-black italic uppercase text-green-300 mb-6">
                Location
              </h2>
              <p className="text-zinc-400 font-bold uppercase tracking-wider text-lg">
                123 Iron Avenue, Industrial District
                <br />
                Steel City, SC 54321
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black italic uppercase text-green-300 mb-6">
                Operating Hours
              </h2>
              <div className="grid grid-cols-2 gap-4 text-zinc-400 font-bold uppercase text-sm">
                <div>
                  <p className="text-white">Mon - Fri</p>
                  <p>05:00 - 23:00</p>
                </div>
                <div>
                  <p className="text-white">Sat - Sun</p>
                  <p>07:00 - 20:00</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-sm md:skew-x-[-3deg]">
              <div className="md:skew-x-[3deg]">
                <h3 className="text-xl font-black italic uppercase text-white">
                  Direct Line
                </h3>
                <p className="text-green-300 text-2xl font-black mt-2">
                  +1 (555) 000-IRON
                </p>
                <p className="text-zinc-500 uppercase font-bold text-xs mt-1">
                  support@ironshell.com
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: FORM */}
          <div className="bg-zinc-900 p-8 md:p-12 border border-zinc-800 shadow-[20px_20px_0px_rgba(187,247,208,0.1)]">
            <form className="space-y-6" onSubmit={onSubmitHandler}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    placeholder="John Doe"
                    className="w-full bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:border-green-300 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    placeholder="john@example.com"
                    className="w-full bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:border-green-300 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">
                  Interest
                </label>
                <select
                  name="interest"
                  required
                  className="w-full bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:border-green-300 transition-all appearance-none"
                >
                  <option>General Inquiry</option>
                  <option>Personal Training</option>
                  <option>Membership Issues</option>
                  <option>Complaints</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  required
                  name="description"
                  placeholder="Tell us your goals..."
                  className="w-full bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:border-green-300 transition-all resize-none"
                ></textarea>
              </div>

              <button
                disabled={loading}
                className="w-full py-5 bg-green-300 text-black font-black uppercase tracking-widest hover:bg-white transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
