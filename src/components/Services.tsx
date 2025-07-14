
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Printer, Server, Wrench } from "lucide-react";

const services = [
  {
    icon: Settings,
    title: "Office Equipment Sales",
    description: "Comprehensive range of quality office equipment from leading brands including copiers, printers, and business machines.",
    features: ["Authorized Dealer", "Latest Technology", "Competitive Pricing"]
  },
  {
    icon: Printer,
    title: "Leasing & Maintenance",
    description: "Flexible leasing options and comprehensive maintenance services to ensure optimal performance and minimal downtime.",
    features: ["Flexible Terms", "24/7 Support", "Preventive Maintenance"]
  },
  {
    icon: Server,
    title: "IT Solutions",
    description: "Complete IT infrastructure solutions including computers, servers, networking equipment, and telecommunications.",
    features: ["Network Setup", "System Integration", "Technical Support"]
  },
  {
    icon: Wrench,
    title: "After-Sales Service",
    description: "Dedicated after-sales support with trained engineers and genuine spare parts to ensure long product life.",
    features: ["Expert Engineers", "Genuine Parts", "Quick Response"]
  }
];

const Services = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering comprehensive solutions across oil & gas, banking, telecommunications, 
            and public sectors throughout Nigeria
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm mx-1">
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
