import { useState, useRef, useEffect } from "react";

const clients = [
  { name: "UNICEF", logo: "https://weadapt.org/wp-content/uploads/2023/05/unicef_vert.png" },
  { name: "FirstBank", logo: "https://www.firstbanknigeria.com/wp-content/uploads/2020/01/First-Bank.svg" },
  { name: "Shell", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Shell_logo.svg/640px-Shell_logo.svg.png" },
  { name: "MTN", logo: "https://logos-world.net/wp-content/uploads/2023/01/MTN-Logo.png" },
  { name: "Telnet", logo: "https://media.licdn.com/dms/image/v2/C4D0BAQE6Alnz3S39SA/company-logo_200_200/company-logo_200_200/0/1630493011038?e=2147483647&v=beta&t=P9e2DFO4O9x21udzKluhu8_M2WLNAfKZ05n2ZU24aM4" },
  { name: "Access Bank", logo: "https://wp.logos-download.com/wp-content/uploads/2023/02/Access_Bank_PLC_Logo.png?dl" },
  { name: "Fidelity Bank", logo: "https://www.seekpng.com/png/full/356-3560448_fidelity-bank-old-logo-brandessence-fidelity-bank-nigeria.png" },
  { name: "AEDC", logo: "https://nerc.gov.ng/wp-content/uploads/2024/04/Artboard-3.png" },
  { name: "Sterling Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/0/07/Sterling_Bank_Logo_Straight.png" },
  { name: "UBA", logo: "https://images.africanfinancials.com/ng-uba-logo.png" },
  { name: "Panasonic", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Panasonic_logo_%28Blue%29.svg/1200px-Panasonic_logo_%28Blue%29.svg.png" },
  { name: "HP", logo: "https://telnetng.com/wp-content/uploads/2025/04/HP-Logo-1024x576.png" }
];

const duplicatedClients = [...clients, ...clients];

export default function Clients() {
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState("20s");
  const marqueeRef = useRef(null);

  useEffect(() => {
    if (marqueeRef.current) {
      // Total width of the marquee content
      const totalWidth = marqueeRef.current.scrollWidth / 2; // /2 because it's duplicated
      const speedFactor = 80; // px per second
      const time = totalWidth / speedFactor; // seconds
      setDuration(`${time}s`);
    }
  }, []);

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
            <div className="w-24 h-24 flex items-center justify-center transition-all duration-700 ease-out">
                <div className="text-5xl grayscale hover:grayscale-0 transition-all duration-700 ease-out relative">
                  <img src={client.logo} alt={client.name} />
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
}
