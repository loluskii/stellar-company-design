
import { Card, CardContent } from "@/components/ui/card";

const clients = [
  { name: "UNICEF", sector: "International Organization" },
  { name: "FirstBank", sector: "Banking" },
  { name: "Shell", sector: "Oil & Gas" },
  { name: "MTN", sector: "Telecommunications" },
  { name: "Telnet", sector: "Telecommunications" },
  { name: "Access Bank", sector: "Banking" },
  { name: "Fidelity Bank", sector: "Banking" },
  { name: "AEDC", sector: "Power & Utilities" },
  { name: "Sterling Bank", sector: "Banking" },
  { name: "UBA", sector: "Banking" },
  { name: "Panasonic", sector: "Technology" },
  { name: "HP", sector: "Technology" }
];

const Clients = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Trusted by Industry Leaders</h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Serving prestigious clients across banking, telecommunications, oil & gas, and public sectors
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {clients.map((client, index) => (
            <Card key={index} className="group hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
              <CardContent className="p-6 text-center">
                <div className="h-16 flex items-center justify-center mb-3">
                  <h3 className="font-bold text-white text-lg group-hover:text-teal-300 transition-colors">
                    {client.name}
                  </h3>
                </div>
                <p className="text-blue-200 text-sm">{client.sector}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/20">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-teal-300">500+</div>
                <div className="text-blue-200">Satisfied Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-300">20+</div>
                <div className="text-blue-200">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-300">24/7</div>
                <div className="text-blue-200">Support Service</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
