import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import ReadyToTransform from "@/components/ReadyToTransform";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Building } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { ContentManager, ContactInfo } from "@/lib/contentManager";

const ContactPage = () => {
  type BranchItem = { name: string; address: string; phone?: string; type: "primary" | "branch" };
  type WarehouseItem = { name: string; address: string };

  const [contact, setContact] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const load = async () => {
      const manager = ContentManager.getInstance();
      await manager.loadContact();
      setContact(manager.getContent().contact);
    };
    load();
  }, []);

  const fallbackBranches: BranchItem[] = [
    {
      name: "Head Office",
      address: "Wellstocked Mall, Plot 1 Hakeem Dickson Link Road, after Lekki Central Mosque, Lekki Phase 1, Lagos, Nigeria",
      type: "primary"
    },
    {
      name: "Lagos Island Branch",
      address: "10, Alli street, off Tinubu square, Lagos Island, Lagos",
      type: "branch"
    }
  ];

  const fallbackWarehouses: WarehouseItem[] = [
    { name: "Ebutte-Meta, Lagos", address: "Contact us for more information" },
    { name: "Sabo-Yaba, Lagos", address: "Contact us for more information" }
  ];

  const { branches, warehouses } = useMemo(() => {
    const result = { branches: [] as BranchItem[], warehouses: [] as WarehouseItem[] };
    const addresses = contact?.address || [];
    if (addresses.length === 0) {
      return { branches: fallbackBranches, warehouses: fallbackWarehouses };
    }

    for (const line of addresses) {
      const upper = line.toUpperCase();
      if (upper.includes("WAREHOUSE")) {
        // Format: 'WAREHOUSE: addr1 | addr2'
        const afterColon = line.split(":")[1] || "";
        const parts = afterColon.split("|").map(s => s.trim()).filter(Boolean);
        for (const p of parts) {
          // Use first word as city name if possible
          const city = p.split(",")[0].trim();
          result.warehouses.push({ name: `${city} Warehouse`, address: p });
        }
        continue;
      }

      if (upper.includes("BRANCH") || upper.includes("HEAD OFFICE")) {
        const [label, restRaw = ""] = line.split(":");
        const rest = restRaw.trim();
        // Extract phone if present after 'Tel:'
        let phone: string | undefined = undefined;
        const telMatch = rest.match(/Tel:\s*(.*)$/i);
        const addressOnly = telMatch ? rest.replace(/Tel:\s*.*/i, "").trim() : rest;
        if (telMatch) {
          phone = telMatch[1].trim();
        }
        // Format name
        let name = label.toLowerCase().split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        if (upper.includes("HEAD OFFICE")) name = "Head Office";
        const type: "primary" | "branch" = upper.includes("HEAD OFFICE") ? "primary" : "branch";
        result.branches.push({ name, address: addressOnly, phone, type });
      }
    }

    // Backfill missing phone numbers from fallback branches by name
    if (result.branches.length) {
      result.branches = result.branches.map((b) => {
        if (b.phone && b.phone.trim().length > 0) return b;
        const fb = fallbackBranches.find(
          (f) => f.name.toLowerCase() === b.name.toLowerCase()
        );
        return fb && fb.phone ? { ...b, phone: fb.phone } : b;
      });
    }

    return {
      branches: result.branches.length ? result.branches : fallbackBranches,
      warehouses: result.warehouses.length ? result.warehouses : fallbackWarehouses,
    };
  }, [contact]);

  const contactMethods = [
    {
      icon: FaWhatsapp,
      title: "Call or Text Us on WhatsApp",
      details: contact?.phone?.length ? contact.phone : ["07050639404", "08172846333","08179652279"],
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: contact?.email?.length ? contact.email : ["info@wellstockedltd.com", "sales@wellstockedltd.com", "operations@wellstockedltd.com"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: contact?.business_hours?.length ? contact.business_hours : ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 4:00 PM", "Sunday: Closed", "Emergency Support: Available 24/7"],
      color: "from-purple-500 to-pink-500"
    }
  ];

  const services = [
    "Equipment Sales & Leasing",
    "Maintenance & Support", 
    "IT Infrastructure Setup",
    "Consultation Services",
    "Training & Implementation"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="py-16 bg-gray-50">

        {/* Hero Section */}

        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 my-gradient"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get In Touch
              </h1>
              <p className="text-base text-white/90 max-w-3xl mx-auto">
                Get in touch with us for all your office equipment and automation needs
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {contactMethods.map((method, index) => (
                <Card key={index} className="text-center border-0 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mb-4`}>
                      <method.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <ul className="list-disc list-inside">
                      {method.details.map((detail, idx) => (
                        <li key={idx} className="text-gray-600 mb-1">{detail}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Branch Locations */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Locations</h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto">
                Visit any of our branches across Nigeria for face-to-face consultations
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {branches.map((branch, index) => (
                <Card key={index} className={`hover:shadow-lg transition-shadow ${
                  branch.type === 'primary' ? 'ring-2 ring-blue-400 ring-offset-2' : ''
                }`}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        branch.type === 'primary' 
                          ? 'bg-gradient-to-br from-blue-600 to-indigo-600' 
                          : 'bg-gradient-to-br from-gray-600 to-gray-700'
                      }`}>
                        {branch.type === 'primary' ? (
                          <Building className="h-6 w-6 text-white" />
                        ) : (
                          <MapPin className="h-6 w-6 text-white" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-900">{branch.name}</CardTitle>
                        {branch.type === 'primary' && (
                          <span className="text-sm text-primary font-medium">Primary Location</span>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600">{branch.address}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Warehouses */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Warehouse Locations</h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {warehouses.map((warehouse, index) => (
                  <Card key={index} className="bg-gray-50 border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                          <Building className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{warehouse.name}</h4>
                          <p className="text-gray-600 text-sm">{warehouse.address}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <Contact />

        <ReadyToTransform />
        <Footer />
      </section>
    </div>
  );
};

export default ContactPage;