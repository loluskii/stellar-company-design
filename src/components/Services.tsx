
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Printer, Server, Wrench, Airplay, 
  CreditCard, Monitor, Users, Award, Building2, Globe, Database, Layers, Briefcase, 
  Shield, Cpu, HardDrive, Network, BatteryCharging, Cloud, Key, Lock, Phone, Tablet, Laptop, MousePointer,
  FileCheck2, FileBarChart2, FileSearch2, FileCog, FilePlus2, FileMinus2, FileX2, FileArchive, FileStack, 
  FileSignature, FileSpreadsheet, FileSymlink, FileText, FileType, FileVideo2, FileVolume2, FileWarning, 
  Folder, FolderOpen, ChevronDown, ChevronUp } from "lucide-react";
import { ContentManager, ServiceItem } from "@/lib/contentManager";

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
  const [services, setServices] = useState([]);
  const maxInitialFeatures = 5;

  useEffect(() => {
    const loadContent = async () => {
      const contentManager = ContentManager.getInstance();
      await contentManager.loadServices();
      const siteContent = contentManager.getContent();
      setServices(siteContent.services);
    };
    loadContent();
  }, []);

  if (services.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">Loading services...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 mt-12">
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Settings;
            const displayFeatures =  service.features.slice(0, 5);
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
                    {displayFeatures.map((feature, idx) => (
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
        {/* {!showAll && services.some(service => service.features.length > maxInitialFeatures) && (
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
        )} */}
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
