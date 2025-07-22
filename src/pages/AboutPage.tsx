
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Clients from "@/components/Clients";
import ReadyToTransform from "@/components/ReadyToTransform";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building, Award, Clock } from "lucide-react";

const AboutPage = () => {
  const stats = [
    { icon: Users, number: "500+", label: "Satisfied Clients" },
    { icon: Building, number: "15+", label: "Years Experience" },
    { icon: Award, number: "50+", label: "Major Projects" },
    { icon: Clock, number: "24/7", label: "Support Available" }
  ];

  const timeline = [
    { year: "2008", title: "Company Founded", description: "WSN established as an office equipment distributor" },
    { year: "2012", title: "Major Expansion", description: "Expanded to serve oil & gas and banking sectors" },
    { year: "2016", title: "Technology Focus", description: "Added IT solutions and digital transformation services" },
    { year: "2020", title: "Market Leadership", description: "Became a leading distributor across Nigeria" },
    { year: "2024", title: "Innovation Drive", description: "Leading the future of office automation" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            About WSN Wellstocked
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in office automation and technology solutions 
            for over 15 years across Nigeria
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover-glow border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900">{stat.number}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main About Section */}
      <About />

      {/* Timeline Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A timeline of growth, innovation, and success
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-center mb-8 last:mb-0">
                <div className="flex-shrink-0 w-24 text-right mr-8">
                  <span className="text-2xl font-bold text-blue-600">{item.year}</span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mr-8 relative">
                  {index !== timeline.length - 1 && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-blue-200"></div>
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <Clients />

      <ReadyToTransform />
      <Footer />
    </div>
  );
};

export default AboutPage;
