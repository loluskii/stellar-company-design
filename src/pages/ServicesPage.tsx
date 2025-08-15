
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import ReadyToTransform from "@/components/ReadyToTransform";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { ContentStore } from "@/lib/contentStore";

const ServicesPage = () => {
  const [servicesPageContent, setServicesPageContent] = useState<any>(null);
  const contentStore = ContentStore.getInstance();

  useEffect(() => {
    const loadContent = async () => {
      await contentStore.loadContent();
      const siteContent = contentStore.getContent();
      setServicesPageContent(siteContent.servicesPage);
    };
    loadContent();
  }, []);

  // Icon mapping
  const iconMap: { [key: string]: any } = {
    CheckCircle, Clock, Users, Award
  };

  // Fallback data
  const fallbackSections = {
    benefits_title: "Why Choose WSN?",
    benefits_description: "Decades of experience delivering exceptional service and support"
  };

  const fallbackBenefits = [
    { icon: "CheckCircle", title: "Quality Assurance", description: "Only authorized dealers with genuine products" },
    { icon: "Clock", title: "24/7 Support", description: "Round-the-clock technical assistance" },
    { icon: "Users", title: "Expert Team", description: "Trained engineers and technicians" },
    { icon: "Award", title: "Proven Track Record", description: "Serving major corporations across Nigeria" }
  ];

  // Use CMS content or fallback
  const sections = servicesPageContent?.sections || fallbackSections;
  const benefits = servicesPageContent?.benefits?.length ? servicesPageContent.benefits : fallbackBenefits;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <Header />
      
      {/* Hero Section */}

      {/* Main Services */}
      <Services />

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{sections.benefits_title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {sections.benefits_description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon] || CheckCircle;
              return (
                <Card key={index} className="text-center hover-glow border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <ReadyToTransform />

      <Footer />
    </div>
  );
};

export default ServicesPage;
