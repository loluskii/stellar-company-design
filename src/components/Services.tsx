
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Printer, Server, Wrench } from "lucide-react";
import { ContentStore, ServiceItem } from "@/lib/contentStore";

const iconMap = {
  Settings,
  Printer,
  Server,
  Wrench
};

const Services = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    const contentStore = ContentStore.getInstance();
    const siteContent = contentStore.getContent();
    setServices(siteContent.services);
  }, []);

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
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Settings;
            return (
              <Card key={service.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
