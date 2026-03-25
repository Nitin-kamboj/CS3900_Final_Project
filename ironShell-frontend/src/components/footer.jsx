import ironshell from "../assets/logo.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-white pt-16 pb-8 px-6 border-t-2 border-zinc-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* 1. Brand & Bio */}
        <div className="col-span-1 md:col-span-1">
          <img src={ironshell} alt="Ironshell Logo" className="w-32 mb-6" />
          <p className="text-zinc-500 text-sm leading-relaxed font-medium">
            The ultimate training ground for dedicated athletes. We don't just
            build bodies; we forge legends. Join the shell.
          </p>
          <div className="flex gap-4 mt-6">
            {/* Social Icons Placeholders */}
            {["FB", "IG", "TW", "YT"].map((social) => (
              <a
                key={social}
                href="#"
                className="w-10 h-10 rounded-sm bg-zinc-900 flex items-center justify-center text-xs font-black hover:bg-green-300 hover:text-black transition-all"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h4 className="text-green-300 font-black italic uppercase tracking-tighter mb-6">
            Navigation
          </h4>
          <ul className="space-y-4 text-zinc-400 font-bold text-sm uppercase">
            <li>
              <a href="/home" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/plans" className="hover:text-white transition-colors">
                Memberships
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* 3. Contact Info */}
        <div>
          <h4 className="text-green-300 font-black italic uppercase tracking-tighter mb-6">
            Contact
          </h4>
          <ul className="space-y-4 text-zinc-400 font-bold text-sm uppercase">
            <li>123 Iron St, Steel City</li>
            <li>+1 (555) 000-IRON</li>
            <li>support@ironshell.com</li>
          </ul>
        </div>

        {/* 4. Newsletter / CTA */}
        <div>
          <h4 className="text-green-300 font-black italic uppercase tracking-tighter mb-6">
            Newsletter
          </h4>
          <p className="text-zinc-500 text-xs font-bold uppercase mb-4">
            Get training tips & gym updates.
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="bg-zinc-900 border border-zinc-800 px-4 py-3 text-xs font-bold focus:outline-none focus:border-green-300"
            />
            <button className="bg-green-300 text-black font-black uppercase py-3 text-xs hover:bg-white transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">
          &copy; {currentYear} IRONSHELL GYM. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6 text-zinc-600 text-[10px] font-black uppercase tracking-widest">
          <a href="#" className="hover:text-green-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-green-300">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
