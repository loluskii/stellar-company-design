
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { ContentManager, HeroContent } from "@/lib/contentManager";

const Hero = () => {
  const [content, setContent] = useState<HeroContent | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      const contentManager = ContentManager.getInstance();
      await contentManager.loadHero();
      const siteContent = contentManager.getContent();
      setContent(siteContent.hero);
    };
    loadContent();
  }, []);

  // Fallback content while loading
  const heroContent = content || {
    title: "WELLSTOCKED Nigeria Limited",
    subtitle: "Premium Quality Products & Services",
    description: "Your trusted partner for all your needs. We provide top-quality products and exceptional services to help your business thrive.",
    phone: "+234 0705 063 9404",
    email: "info@wellstockedltd.com",
    location: "Lagos, Nigeria"
  };

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center my-gradient overflow-hidden">
      {/* Background Pattern */}

      
      <div className="container mx-auto px-4 py-8 z-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8 z-30 relative">
            <div className="space-y-4">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white">
                {heroContent.subtitle}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight text-white">
                {heroContent.title}
              </h1>
              <p className="text-base text-blue-100 leading-snug md:leading-relaxed">
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
            
            <div className="sm:flex flex-col sm:flex-row gap-6 hidden">
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
                src="https://www.gi-de.com/corporate/_processed_/2/c/csm_title_BPS_C2family_334fbebd44.jpg"
                alt="Team working with advanced display technology and automation solutions"
                className="rounded-3xl shadow-2xl w-full h-full min-h-[250px] object border-4 border-white/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
