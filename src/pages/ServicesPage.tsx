import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadyToTransform from "@/components/ReadyToTransform";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Users, Award, ArrowRight, Settings, Printer, Server, Wrench, Building2, Globe, Database, Shield, Cpu, Network, Cloud } from "lucide-react";
import { Link } from "react-router-dom";
import { ContentStore } from "@/lib/contentStore";

const ServicesPage = () => {
  const [servicesPageContent, setServicesPageContent] = useState<any>(null);
  const contentStore = ContentStore.getInstance();

  useEffect(() => {
    const loadContent = async () => {
      await contentStore.loadServicesPage();
      const siteContent = contentStore.getContent();
      setServicesPageContent(siteContent.servicesPage);
    };
    loadContent();
  }, []);

  // Icon mapping
  const iconMap: { [key: string]: any } = {
    CheckCircle, Clock, Users, Award, Settings, Printer, Server, Wrench, Building2, Globe, Database, Shield, Cpu, Network, Cloud, ArrowRight
  };

  // Fallback data
  const fallbackSections = {
    hero_title: "Our Services & Solutions",
    hero_subtitle: "Comprehensive Technology Solutions",
    hero_description: "From office equipment to IT infrastructure, we provide complete business solutions tailored to your needs.",
    features_title: "What We Offer",
    features_description: "Comprehensive solutions for all your business technology needs",
    benefits_title: "Why Choose WSN?",
    benefits_description: "Decades of experience delivering exceptional service and support",
    process_title: "Our Process",
    process_description: "How we deliver exceptional results for your business"
  };

  const fallbackFeatures = [
    {
      icon: "Printer",
      title: "Office Equipment",
      description: "Complete range of office automation solutions",
      features: ["Sharp Photocopiers", "HP & Dell Printers", "Industrial UPS Systems", "ATM Consumables", "Note Counting Machines"]
    },
    {
      icon: "Server",
      title: "IT Infrastructure",
      description: "Enterprise-grade IT solutions and support",
      features: ["Server Installation", "Network Setup", "Cloud Solutions", "Security Systems", "Database Management"]
    },
    {
      icon: "Wrench",
      title: "Maintenance & Support",
      description: "Comprehensive maintenance and technical support",
      features: ["24/7 Support", "Preventive Maintenance", "On-site Repairs", "Remote Diagnostics", "Parts Replacement"]
    }
  ];

  const fallbackBenefits = [
    { icon: "CheckCircle", title: "Quality Assurance", description: "Only authorized dealers with genuine products" },
    { icon: "Clock", title: "24/7 Support", description: "Round-the-clock technical assistance" },
    { icon: "Users", title: "Expert Team", description: "Trained engineers and technicians" },
    { icon: "Award", title: "Proven Track Record", description: "Serving major corporations across Nigeria" }
  ];

  const fallbackProcess = [
    { step_number: 1, icon: "Users", title: "Consultation", description: "We analyze your business needs and requirements" },
    { step_number: 2, icon: "Settings", title: "Planning", description: "Custom solution design and implementation planning" },
    { step_number: 3, icon: "Wrench", title: "Implementation", description: "Professional installation and configuration" },
    { step_number: 4, icon: "Award", title: "Support", description: "Ongoing maintenance and technical support" }
  ];

  // Use CMS content or fallback
  const sections = servicesPageContent?.sections || fallbackSections;
  const features = servicesPageContent?.features?.length ? servicesPageContent.features : fallbackFeatures;
  const benefits = servicesPageContent?.benefits?.length ? servicesPageContent.benefits : fallbackBenefits;
  const process = servicesPageContent?.process?.length ? servicesPageContent.process : fallbackProcess;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 my-gradient"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {sections.hero_title}
            </h1>
            <p className="text-xl mb-4">
              {sections.hero_subtitle}
            </p>
            <p className="text-base text-white/90 max-w-3xl mx-auto">
              {sections.hero_description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{sections.features_title}</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              {sections.features_description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon] || Settings;
              return (
                <Card key={index} className="group h-full border hover-glow">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-center">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-6">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{sections.process_title}</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              {sections.process_description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, index) => {
              const IconComponent = iconMap[step.icon] || Settings;
              return (
                <div key={index} className="text-center">
                  <div className="relative">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{step.step_number}</span>
                    </div>
                    {index < process.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-full w-full">
                        <ArrowRight className="h-6 w-6 text-primary mx-auto" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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