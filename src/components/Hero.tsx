
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { ContentStore, HeroContent } from "@/lib/contentStore";

const Hero = () => {
  const [content, setContent] = useState<HeroContent | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      const contentStore = ContentStore.getInstance();
      await contentStore.loadContent();
      const siteContent = contentStore.getContent();
      setContent(siteContent.hero);
    };
    loadContent();
  }, []);

  // Fallback content while loading
  const heroContent = content || {
    title: "WELLSTOCKED",
    subtitle: "Premium Quality Products & Services",
    description: "Your trusted partner for all your needs. We provide top-quality products and exceptional services to help your business thrive.",
    phone: "+234 XXX XXX XXXX",
    email: "info@wellstocked.ng",
    location: "Lagos, Nigeria"
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-blue-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 border-2 border-white/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-white/20 rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 z-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8 z-30 relative">
            <div className="space-y-4">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white">
                {heroContent.subtitle}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
                {heroContent.title.split(' ').slice(0, 2).join(' ')}
                <span className="block text-blue-200">
                  {heroContent.title.split(' ').slice(2).join(' ')}
                </span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                {heroContent.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 z-40 relative">
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white bg-white/10 hover:bg-white/20 px-8 py-3 rounded-full transition-all duration-300 z-40 relative">
                Contact Us
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-teal-300" />
                <span className="text-blue-100">{heroContent.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-teal-300" />
                <span className="text-blue-100">{heroContent.email}</span>
              </div>
            </div>
          </div>
          
          <div className="relative z-30 h-full">
            {/* Hero Image */}
            <div className="relative h-full">
              <img
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop"
                alt="Team working with advanced display technology and automation solutions"
                className="rounded-3xl shadow-2xl w-full h-full min-h-[500px] object-cover border-4 border-white/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
