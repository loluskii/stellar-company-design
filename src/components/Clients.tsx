
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
    <section className="py-32 relative overflow-hidden">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-slate-50 via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-slate-50 via-white/80 to-transparent z-10 pointer-events-none" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-20 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-32 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"></div>
      <div className="absolute top-1/2 left-10 w-1 h-20 bg-gradient-to-b from-transparent via-purple-300 to-transparent opacity-50"></div>

      <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Trusted By
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Our clients and partners who trust us to deliver excellence
          </p>
        </div>

      {/* Enhanced Marquee Container */}
      <div 
        className="flex space-x-20 animate-marquee"
        style={{
          animationDuration: '45s',
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedClients.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className="flex-shrink-0 group cursor-pointer relative"
          >
            {/* Floating card with enhanced styling */}
            <div className="relative">
              <div className="w-36 h-36 flex items-center justify-center rounded-3xl glass-morphism backdrop-blur-xl bg-white/70 border-2 border-white/30 shadow-xl transition-all duration-700 ease-out">
                <div className="text-7xl grayscale transition-all duration-700 ease-out relative">
                  {client.logo}
                  <div className="absolute inset-0 bg-gradient-to-r rounded-full blur-xl opacity-0 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <div className="text-sm font-bold text-slate-500 transition-all duration-500 tracking-wider relative">
                {client.name}
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Clients;
