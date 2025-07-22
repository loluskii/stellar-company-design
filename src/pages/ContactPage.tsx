import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import ReadyToTransform from "@/components/ReadyToTransform";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Building } from "lucide-react";

const ContactPage = () => {
  const branches = [
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

  const warehouses = [
    {
      name: "Lagos Warehouse",
      address: "71, Jebba Street, Ebute-Metta, Lagos"
    },
    {
      name: "Yaba Warehouse", 
      address: "Oyadiran Street, Sabo-Yaba, Lagos"
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["01-2702549", "01-4610412", "07027702217", "07027706037"],
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@wellstockednig.com", "sales@wellstockednig.com"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 4:00 PM", "Sunday: Closed", "Emergency Support: Available 24/7"],
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ready to transform your office? Connect with our experts across Nigeria 
              for personalized solutions and exceptional service
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
                        <span className="text-sm text-blue-600 font-medium">Primary Location</span>
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