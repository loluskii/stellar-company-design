
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { ContentStore, HeroContent } from "@/lib/contentStore";

const Hero = () => {
  const [content, setContent] = useState<HeroContent | null>(null);

  useEffect(() => {
    const contentStore = ContentStore.getInstance();
    const siteContent = contentStore.getContent();
    setContent(siteContent.hero);
    console.log('Hero content loaded:', siteContent.hero);
  }, []);

  // Remove the loading state that might be blocking content
  const heroContent = content || {
    title: "Premium Office Equipment & Automation",
    subtitle: "WSN - Wellstocked Nigeria Limited",
    description: "We are a recognized, innovative, and authorized distributor of quality office equipment and automation solutions in Nigeria. Serving diverse sectors with excellence for over 20 years.",
    stats: {
      years: "20+",
      clients: "500+",
      support: "24/7"
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 overflow-hidden">
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
                <span className="block bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">
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
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full transition-all duration-300 z-40 relative">
                Contact Us
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-teal-300" />
                <span className="text-blue-100">+234 XXX XXX XXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-teal-300" />
                <span className="text-blue-100">info@wellstocked.ng</span>
              </div>
            </div>
          </div>
          
          <div className="relative z-30">
            {/* Hero Image */}
            <div className="relative mb-8">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&crop=faces"
                alt="Professional team working"
                className="rounded-3xl shadow-2xl w-full h-80 object-cover border-4 border-white/20"
              />
              <div className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=150&fit=crop"
                  alt="Technology workspace"
                  className="rounded-lg w-24 h-18 object-cover"
                />
              </div>
            </div>
            
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{heroContent.stats.years} Years</h3>
                  <p className="text-blue-200">of Excellence</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-3xl font-bold text-teal-300">{heroContent.stats.clients}</div>
                    <div className="text-sm text-blue-200">Clients Served</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-3xl font-bold text-teal-300">{heroContent.stats.support}</div>
                    <div className="text-sm text-blue-200">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
