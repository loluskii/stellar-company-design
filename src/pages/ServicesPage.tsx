
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
import { ContentManager } from "@/lib/contentManager";

const ServicesPage = () => {
  const [servicesPageContent, setServicesPageContent] = useState<any>(null);
  const contentManager = ContentManager.getInstance();

  useEffect(() => {
    const loadContent = async () => {
      await contentManager.loadServicesPage();
      const siteContent = contentManager.getContent();
      setServicesPageContent(siteContent.servicesPage);
    };
    loadContent();
  }, []);

  // Icon mapping
  const iconMap: { [key: string]: any } = {
    CheckCircle, Clock, Users, Award
  };

  if (!servicesPageContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const { sections, benefits } = servicesPageContent;

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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{sections.benefits_title}</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
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
