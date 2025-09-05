import { useState, useRef, useEffect } from "react";
import { ContentManager, ClientItem } from "@/lib/contentManager";

const Clients = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState("20s");
  const [clients, setClients] = useState<ClientItem[]>([]);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const loadContent = async () => {
      const contentManager = ContentManager.getInstance();
      await contentManager.loadClients();
      const siteContent = contentManager.getContent();
      setClients(siteContent.clients);
    };
    loadContent();
  }, []);

  useEffect(() => {
    if (marqueeRef.current) {
      // Total width of the marquee content
      const totalWidth = marqueeRef.current.scrollWidth / 2; // /2 because it's duplicated
      const speedFactor = 80; // px per second
      const time = totalWidth / speedFactor; // seconds
      setDuration(`${time}s`);
    }
  }, [clients]);

  if (clients.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">Loading clients...</p>
        </div>
      </section>
    );
  }

  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-16 relative overflow-hidden bg-white">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-white"></div>
      <div className="absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-white"></div>

      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Trusted By</h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Our clients and partners who trust us to deliver excellence
        </p>
      </div>

      <div
        className="overflow-hidden relative my-3"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={marqueeRef}
          className="flex w-max gap-12 animate-scroll"
          style={{
            animationDuration: duration,
            animationPlayState: isPaused ? "paused" : "running"
          }}
        >
          {duplicatedClients.map((client, index) => (
            <div key={`${client.name}-${index}`} className="w-24 h-24 flex items-center justify-center transition-all duration-700 ease-out">
              <div className="text-5xl grayscale hover:grayscale-0 transition-all duration-700 ease-out relative">
                <img src={client.logo_url} alt={client.name} />
                <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-0 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Clients;