
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Printer, Server, Wrench, Airplay, CreditCard, Monitor, Users, Award, Building2, Globe, Database, Layers, Briefcase, Shield, Cpu, HardDrive, Network, BatteryCharging, Cloud, Key, Lock, Phone, Tablet, Laptop, MousePointer, FileText, FileCheck2, FileBarChart2, FileSearch2, FileCog, FilePlus2, FileMinus2, FileX2, FileArchive, FileStack, FileSignature, FileSpreadsheet, FileSymlink, FileText, FileType, FileVideo2, FileVolume2, FileWarning, FileZip, Folder, FolderOpen, FolderPlus, FolderMinus, FolderX, FolderArchive, FolderSymlink, FolderInput, FolderOutput, FolderSearch, FolderCog, FolderKey, FolderLock, FolderPlus, FolderMinus, FolderX, FolderArchive, FolderSymlink, FolderInput, FolderOutput, FolderSearch, FolderCog, FolderKey, FolderLock } from "lucide-react";

const services = [
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
    icon: Printer
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
    icon: Wrench
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
    icon: Server
  }
];

const Services = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services & Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive sales, supply, leasing, and maintenance of office equipment, IT, and automation solutions for every sector in Nigeria.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon || Settings;
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
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {feature}
                      </span>
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
