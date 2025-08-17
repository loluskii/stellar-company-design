
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Printer, Server, Wrench, Airplay, 
  CreditCard, Monitor, Users, Award, Building2, Globe, Database, Layers, Briefcase, 
  Shield, Cpu, HardDrive, Network, BatteryCharging, Cloud, Key, Lock, Phone, Tablet, Laptop, MousePointer,
  FileCheck2, FileBarChart2, FileSearch2, FileCog, FilePlus2, FileMinus2, FileX2, FileArchive, FileStack, 
  FileSignature, FileSpreadsheet, FileSymlink, FileText, FileType, FileVideo2, FileVolume2, FileWarning, 
  Folder, FolderOpen, ChevronDown, ChevronUp } from "lucide-react";
import { ContentStore, ServicesPageFeature } from "@/lib/contentStore";

// Icon mapping for services loaded from database
const iconMap: { [key: string]: any } = {
  "Printer": Printer,
  "Server": Server,
  "Wrench": Wrench,
  "Settings": Settings,
  "Building2": Building2,
  "Globe": Globe,
  "Database": Database,
  "Shield": Shield,
  "Cpu": Cpu,
  "Network": Network,
  "Cloud": Cloud
};

const Services = () => {
  const [showAll, setShowAll] = useState(false);
  const [services, setServices] = useState<ServicesPageFeature[]>([]);
  const maxInitialFeatures = 5;

  useEffect(() => {
    const loadContent = async () => {
      const contentStore = ContentStore.getInstance();
      await contentStore.loadServicesPage();
      const siteContent = contentStore.getContent();
      setServices(siteContent.servicesPage.features);
    };
    loadContent();
  }, []);


  if (services.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Services</h2>
            <p className="text-gray-600">No services configured. Please add services in the admin panel.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 my-gradient"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Services & Solutions
            </h1>
            <p className="text-base text-white/90 max-w-3xl mx-auto">
            Comprehensive sales, supply, leasing, and maintenance of office equipment, IT, and automation solutions for every sector in Nigeria.
            </p>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 mt-12">
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Settings;
            const displayFeatures = showAll 
              ? service.features 
              : service.features.slice(0, maxInitialFeatures);
            const remainingCount = service.features.length - maxInitialFeatures;
            
            return (
              <Card key={service.title} className="group h-full border bg-white">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-center">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {feature}
                      </span>
                    ))}
                    {!showAll && remainingCount > 0 && (
                      <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                        +{remainingCount} more
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        {!showAll && services.some(service => service.features.length > maxInitialFeatures) && (
          <div className="text-center mt-12">
            <Button 
              onClick={() => setShowAll(true)}
              variant="outline"
              className="bg-white hover:bg-blue-50 border-blue-200 text-blue-600 hover:text-blue-700"
            >
              View All Features
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
        {showAll && (
          <div className="text-center mt-12">
            <Button 
              onClick={() => setShowAll(false)}
              variant="outline"
              className="bg-white hover:bg-blue-50 border-blue-200 text-blue-600 hover:text-blue-700"
            >
              Show Less
              <ChevronUp className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
