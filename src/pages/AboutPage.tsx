import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Clients from "@/components/Clients";
import ReadyToTransform from "@/components/ReadyToTransform";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Building, Award, Clock, Target, Eye, Heart, Zap, Shield, Globe2, CheckCircle } from "lucide-react";
import aboutPageData from "@/data/aboutPage.json";

const AboutPage = () => {
  const [aboutPageContent, setAboutPageContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for consistency
    const timer = setTimeout(() => {
      setAboutPageContent(aboutPageData);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Icon mapping
  const iconMap: { [key: string]: any } = {
    Users, Building, Award, Clock, Target, Eye, Heart, Zap, Shield, Globe2, CheckCircle
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading content...</p>
          </div>
        </div>
      </div>
    );
  }

  // Use static content from JSON
  const sections = aboutPageContent?.sections;
  const stats = aboutPageContent?.stats || [];
  const values = aboutPageContent?.values || [];
  const milestones = aboutPageContent?.milestones || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Dramatic and Modern */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              {sections.hero_title}
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
                {sections.hero_subtitle}
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              {sections.hero_description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = iconMap[stat.icon] || Users;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4">
                      <IconComponent className="h-8 w-8 text-cyan-400" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                {sections.story_title.split(' ').slice(0, -1).join(' ')}
                <span className="text-primary"> {sections.story_title.split(' ').slice(-1)}</span>
              </h2>
              <div className="space-y-6 text-base text-gray-600 leading-relaxed">
                {sections.story_content?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            
            {/* <div className="aspect-[4/3] hidden bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-8 flex items-center justify-center">
              <div className="text-center">
                <Building className="h-24 w-24 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">15+ Years</h3>
                <p className="text-gray-600">of Innovation & Excellence</p>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {sections.values_title}
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              {sections.values_description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = iconMap[value.icon] || CheckCircle;
              return (
                <Card key={index} className="text-center hover-glow border-0 bg-white shadow-lg">
                  <CardContent className="p-8">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey Timeline - Horizontal */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {sections.journey_title}
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto">
                {sections.journey_description}
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/80 transform -translate-y-1/2 hidden lg:block"></div>
              
              <div className="grid lg:grid-cols-5 gap-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative">
                    <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                      milestone.highlight ? 'ring-2 ring-primary ring-offset-2' : ''
                    }`}>
                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                          milestone.highlight 
                            ? 'bg-gradient-to-br from-primary to-primary/80 text-white' 
                            : 'bg-primary/10 text-primary'
                        }`}>
                          <span className="font-bold text-sm">{milestone.year}</span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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