
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

      <div className="container mx-auto px-4 mb-20">
        <div className="text-center relative">
          <div className="inline-block relative">
            <h2 className="text-7xl lg:text-8xl font-black gradient-text mb-8 tracking-tighter relative">
              TRUSTED BY
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce opacity-80"></div>
            </h2>
            {/* Underline animation */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 rounded-full animate-glow"></div>
          </div>
          <p className="text-xl text-slate-600 mt-6 font-medium tracking-wide">
            Powering innovation across industries since 2004
          </p>
        </div>
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
              <div className="w-36 h-36 flex items-center justify-center rounded-3xl glass-morphism backdrop-blur-xl bg-white/70 border-2 border-white/30 shadow-xl transition-all duration-700 ease-out group-hover:border-purple-400/50 group-hover:shadow-2xl group-hover:shadow-purple-500/30 group-hover:-translate-y-4 group-hover:scale-110 group-hover:rotate-2 hover-glow">
                <div className="text-7xl grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-125 group-hover:rotate-12 relative">
                  {client.logo}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
              
              {/* Glowing ring effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10 group-hover:scale-125"></div>
              
              {/* Floating particles */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 delay-100"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300 delay-200"></div>
            </div>
            
            <div className="mt-6 text-center">
              <div className="text-sm font-bold text-slate-500 group-hover:text-slate-800 transition-all duration-500 tracking-wider relative">
                {client.name}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced bottom stats */}
      <div className="mt-28 text-center relative">
        <div className="inline-flex items-center gap-16 glass-morphism backdrop-blur-2xl bg-gradient-to-r from-white/80 to-purple-50/80 rounded-full px-16 py-8 border border-white/40 shadow-2xl relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-violet-500/10 animate-pulse"></div>
          
          <div className="text-center relative z-10">
            <div className="text-4xl font-black gradient-text animate-scale-in">500+</div>
            <div className="text-slate-600 text-sm font-bold tracking-widest mt-1">CLIENTS</div>
          </div>
          
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-purple-300 to-transparent relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          </div>
          
          <div className="text-center relative z-10">
            <div className="text-4xl font-black gradient-text animate-scale-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>20+</div>
            <div className="text-slate-600 text-sm font-bold tracking-widest mt-1">YEARS</div>
          </div>
          
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-purple-300 to-transparent relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
          </div>
          
          <div className="text-center relative z-10">
            <div className="text-4xl font-black gradient-text animate-scale-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>24/7</div>
            <div className="text-slate-600 text-sm font-bold tracking-widest mt-1">SUPPORT</div>
          </div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute -top-8 left-1/4 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute -bottom-4 right-1/3 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce opacity-70"></div>
      </div>
    </section>
  );
};

export default Clients;
