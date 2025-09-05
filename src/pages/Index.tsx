
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ReadyToTransform from "@/components/ReadyToTransform";
import { Progress } from "@/components/ui/progress";
import { ContentManager } from "@/lib/contentManager";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const manager = ContentManager.getInstance();
    Promise.all([
      manager.loadHero(),
      manager.loadAbout(),
      manager.loadServices(),
      manager.loadClients(),
    ]).then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
        <img src="/wsn-logo.png" alt="WSN Logo" className="mb-8 w-32 h-auto" />
        <div className="w-64">
          <Progress value={100} className="h-1" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden flex flex-col">
      <Header />
      <div className="relative pt-16">
        <div className="animate-fade-in" style={{ animationFillMode: 'both' }}>
          <Hero />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <About />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <Services />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          <Clients />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
          <ReadyToTransform />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
