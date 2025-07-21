
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactPage = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: ["Lagos, Nigeria", "Port Harcourt, Nigeria"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+234 XXX XXX XXXX", "+234 XXX XXX XXXX"],
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@wellstocked.ng", "sales@wellstocked.ng"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM"],
      color: "from-orange-500 to-red-500"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your office? Get in touch with our experts 
            for personalized solutions and exceptional service
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover-glow border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                  <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <info.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg text-gray-900">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 mb-1">{detail}</p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
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

      {/* Map Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Our Locations</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Visit our offices in Lagos and Port Harcourt for face-to-face consultations
            </p>
          </div>
          
          <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Interactive map coming soon</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
