
import { useState, useEffect } from "react";

const clients = [
  { name: "UNICEF", logo: "🌍" },
  { name: "FirstBank", logo: "🏦" },
  { name: "Shell", logo: "🐚" },
  { name: "MTN", logo: "📱" },
  { name: "Telnet", logo: "📡" },
  { name: "Access Bank", logo: "💳" },
  { name: "Fidelity Bank", logo: "🏛️" },
  { name: "AEDC", logo: "⚡" },
  { name: "Sterling Bank", logo: "💎" },
  { name: "UBA", logo: "🦄" },
  { name: "Panasonic", logo: "📺" },
  { name: "HP", logo: "💻" }
];

// Duplicate the array for seamless loop
const duplicatedClients = [...clients, ...clients];

const Clients = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-32 overflow-hidden relative">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center">
          <h2 className="text-6xl font-black bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent mb-6 tracking-tight">
            TRUSTED BY
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
        </div>
      </div>

      {/* Marquee Container */}
      <div 
        className="flex space-x-16 animate-marquee"
        style={{
          animationDuration: '40s',
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedClients.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className="flex-shrink-0 group cursor-pointer"
          >
            <div className="w-32 h-32 flex items-center justify-center rounded-3xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm transition-all duration-500 ease-out group-hover:border-purple-400 group-hover:shadow-2xl group-hover:shadow-purple-500/25 group-hover:-translate-y-2 group-hover:scale-110">
              <div className="text-6xl grayscale group-hover:grayscale-0 transition-all duration-500 ease-out group-hover:scale-125 group-hover:rotate-12">
                {client.logo}
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm font-bold text-slate-400 group-hover:text-slate-800 transition-colors duration-300 tracking-wider">
                {client.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom stats with modern styling */}
      <div className="mt-24 text-center">
        <div className="inline-flex items-center gap-12 bg-gradient-to-r from-slate-50 to-purple-50 rounded-full px-12 py-6 border border-slate-200/50 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">500+</div>
            <div className="text-slate-600 text-sm font-semibold tracking-wide">CLIENTS</div>
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
          <div className="text-center">
            <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">20+</div>
            <div className="text-slate-600 text-sm font-semibold tracking-wide">YEARS</div>
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
          <div className="text-center">
            <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">24/7</div>
            <div className="text-slate-600 text-sm font-semibold tracking-wide">SUPPORT</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
