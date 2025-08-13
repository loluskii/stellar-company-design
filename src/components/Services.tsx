
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Printer, Server, Wrench, Airplay, 
  CreditCard, Monitor, Users, Award, Building2, Globe, Database, Layers, Briefcase, 
  Shield, Cpu, HardDrive, Network, BatteryCharging, Cloud, Key, Lock, Phone, Tablet, Laptop, MousePointer,
  FileCheck2, FileBarChart2, FileSearch2, FileCog, FilePlus2, FileMinus2, FileX2, FileArchive, FileStack, 
  FileSignature, FileSpreadsheet, FileSymlink, FileText, FileType, FileVideo2, FileVolume2, FileWarning, 
  Folder, FolderOpen, ChevronDown, ChevronUp } from "lucide-react";
import { ContentStore, ServiceItem } from "@/lib/contentStore";

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
  const [services, setServices] = useState<ServiceItem[]>([]);
  const maxInitialFeatures = 5;

  useEffect(() => {
    const loadContent = async () => {
      const contentStore = ContentStore.getInstance();
      await contentStore.loadContent();
      const siteContent = contentStore.getContent();
      setServices(siteContent.services);
    };
    loadContent();
  }, []);

  // Fallback services while loading
  const fallbackServices: ServiceItem[] = [
    {
      title: "Office Equipment Sales & Supply",
      description: "Authorized distributor and supplier of quality office equipment and automation solutions.",
      features: [
        "Sharp Photocopiers",
        "Panasonic, Sharp, HP Printers",
        "Industrial/Online UPS",
        "Computer Systems & Accessories (HP, Dell, etc.)",
        "ATM Consumables",
        "Note Counting Machines",
        "Air Conditioners",
        "Office Furniture",
        "Interactive Displays & Video Walls",
        "Industrial Scanners & Shredders",
        "POS Machines & Consumables",
        "ID Card Printing Machines (Fargo)",
        "Networking Hardware/Software (Cisco, etc.)"
      ],
      icon: "Printer"
    },
    {
      title: "Leasing & Maintenance",
      description: "Flexible leasing options and comprehensive maintenance for all supplied equipment.",
      features: [
        "Preventive Maintenance",
        "After-Sales Service",
        "Breakdown Repairs",
        "Regular Servicing",
        "Nationwide Support",
        "Prompt Response, Minimal Downtime"
      ],
      icon: "Wrench"
    },
    {
      title: "IT & Office Solutions",
      description: "Integrated technology and office solutions for modern businesses.",
      features: [
        "Computer Networking",
        "Servers & Storage",
        "Cloud Solutions",
        "Software Licensing",
        "Security & Access Control",
        "Broadband & Connectivity",
        "Consulting & Custom Solutions"
      ],
      icon: "Server"
    }
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Our Services & Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive sales, supply, leasing, and maintenance of office equipment, IT, and automation solutions for every sector in Nigeria.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {displayServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Settings;
            const displayFeatures = showAll 
              ? service.features 
              : service.features.slice(0, maxInitialFeatures);
            const remainingCount = service.features.length - maxInitialFeatures;
            
            return (
              <Card key={service.title} className="group h-full border bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {displayFeatures.map((feature, idx) => (
                      <span key={idx} className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
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
        {!showAll && displayServices.some(service => service.features.length > maxInitialFeatures) && (
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
