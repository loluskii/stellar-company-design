import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import ReadyToTransform from "@/components/ReadyToTransform";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Building } from "lucide-react";
import { ContentStore, ContactInfo } from "@/lib/contentStore";

const ContactPage = () => {
  type BranchItem = { name: string; address: string; phone?: string; type: "primary" | "branch" };
  type WarehouseItem = { name: string; address: string };

  const [contact, setContact] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const load = async () => {
      const store = ContentStore.getInstance();
      await store.loadContact(true);
      setContact(store.getContent().contact);
    };
    load();
  }, []);

  const fallbackBranches: BranchItem[] = [
    {
      name: "Head Office",
      address: "Block 123, Plot 4, Adewale Kolawole Street, Off Remi Olowude Street, New Marwa Market, Lekki Phase I, Lagos",
      phone: "01-2702549, 01-4610412",
      type: "primary"
    },
    {
      name: "Ikeja Branch",
      address: "4, Pepple Street, Beside Zenith Bank, Shop 37, Computer Village, Ikeja, Lagos",
      phone: "01-7745209",
      type: "branch"
    },
    {
      name: "Abuja Branch",
      address: "Suite F18 Febson Mall, Herbert Macaulay Way, Zone 4, Wuse, Abuja",
      phone: "09-5239915, 6721589",
      type: "branch"
    },
    {
      name: "Port Harcourt Branch",
      address: "6A, Ogunabali, Off Trans-Amadi Road, Garrison, Port Harcourt, River State",
      phone: "08104920283",
      type: "branch"
    }
  ];

  const fallbackWarehouses: WarehouseItem[] = [
    { name: "Lagos Warehouse", address: "71, Jebba Street, Ebute-Metta, Lagos" },
    { name: "Yaba Warehouse", address: "Oyadiran Street, Sabo-Yaba, Lagos" }
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
      icon: Phone,
      title: "Call Us",
      details: contact?.phone?.length ? contact.phone : ["01-2702549", "01-4610412", "07027702217", "07027706037"],
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: contact?.email?.length ? contact.email : ["info@wellstockednig.com", "sales@wellstockednig.com"],
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
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 my-gradient"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Get in touch with us for all your office equipment and automation needs
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-600">Multiple ways to reach us for your convenience</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center border-0 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{method.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {method.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 mb-1">{detail}</p>
                  ))}
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Locations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <p className="text-gray-600">{branch.phone}</p>
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

      {/* Services Overview */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Can Help</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive services cover all your office automation needs
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mr-4"></div>
                  <span className="text-gray-700 font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ReadyToTransform />
      <Footer />
    </div>
  );
};

export default ContactPage;