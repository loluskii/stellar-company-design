import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Clients from "@/components/Clients";
import ReadyToTransform from "@/components/ReadyToTransform";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Building, Award, Clock, Target, Eye, Heart, Zap, Shield, Globe2, CheckCircle } from "lucide-react";
import { ContentStore } from "@/lib/contentStore";

const AboutPage = () => {
  const [aboutPageContent, setAboutPageContent] = useState<any>(null);
  const contentStore = ContentStore.getInstance();

  useEffect(() => {
    const loadContent = async () => {
      await contentStore.loadContent();
      const siteContent = contentStore.getContent();
      setAboutPageContent(siteContent.aboutPage);
    };
    loadContent();
  }, []);

  // Icon mapping
  const iconMap: { [key: string]: any } = {
    Users, Building, Award, Clock, Target, Eye, Heart, Zap, Shield, Globe2, CheckCircle
  };

  // Fallback data
  const fallbackSections = {
    hero_title: "Redefining",
    hero_subtitle: "Office Excellence", 
    hero_description: "For over 15 years, we've been transforming workspaces across Nigeria with cutting-edge technology and unmatched expertise.",
    story_title: "Our Story of Innovation",
    story_content: [
      "Founded in 2008, Wellstocked Nigeria Limited emerged from a vision to revolutionize office automation across Nigeria. What started as a mission to provide quality equipment has evolved into a comprehensive technology partnership platform.",
      "Today, we stand as Nigeria's premier office automation specialist, serving over 500 clients across diverse industries including oil & gas, banking, telecommunications, and government sectors.",
      "Our commitment to excellence, innovation, and customer success has made us the trusted choice for organizations seeking to transform their operations through technology."
    ],
    values_title: "Our Core Values",
    values_description: "The principles that guide everything we do and define who we are as a company",
    journey_title: "Our Journey", 
    journey_description: "Key milestones that shaped our growth and success story"
  };

  const fallbackStats = [
    { icon: "Users", number: "500+", label: "Satisfied Clients" },
    { icon: "Building", number: "15+", label: "Years Experience" },
    { icon: "Award", number: "50+", label: "Major Projects" },
    { icon: "Clock", number: "24/7", label: "Support Available" }
  ];

  const fallbackValues = [
    { icon: "Target", title: "Excellence", description: "We deliver superior quality products and services that exceed expectations." },
    { icon: "Shield", title: "Reliability", description: "Dependable solutions and support you can count on for your business operations." },
    { icon: "Heart", title: "Customer Focus", description: "Your success is our priority. We build lasting partnerships through exceptional service." },
    { icon: "Zap", title: "Innovation", description: "Embracing cutting-edge technology to provide modern solutions for evolving needs." },
    { icon: "Eye", title: "Transparency", description: "Clear communication and honest business practices in all our interactions." },
    { icon: "Globe2", title: "Integrity", description: "Ethical business practices and genuine commitment to our clients' success." }
  ];

  const fallbackMilestones = [
    { year: "2008", title: "Foundation", description: "WSN established as a pioneer in office equipment distribution", highlight: true },
    { year: "2012", title: "Sector Expansion", description: "Strategic expansion into oil & gas and banking sectors", highlight: false },
    { year: "2016", title: "Digital Evolution", description: "Integration of IT solutions and digital transformation services", highlight: false },
    { year: "2020", title: "Market Leadership", description: "Achieved recognition as a leading distributor nationwide", highlight: false },
    { year: "2024", title: "Future Forward", description: "Pioneering next-generation office automation solutions", highlight: true }
  ];

  // Use CMS content or fallback
  const sections = aboutPageContent?.sections || fallbackSections;
  const stats = aboutPageContent?.stats?.length ? aboutPageContent.stats : fallbackStats;
  const values = aboutPageContent?.values?.length ? aboutPageContent.values : fallbackValues;
  const milestones = aboutPageContent?.milestones?.length ? aboutPageContent.milestones : fallbackMilestones;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Dramatic and Modern */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              {sections.hero_title}
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
                {sections.hero_subtitle}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto">
              {sections.hero_description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = iconMap[stat.icon] || Users;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4 backdrop-blur-sm">
                      <IconComponent className="h-8 w-8 text-cyan-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-blue-200 text-sm font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                  {sections.story_title.split(' ').slice(0, -1).join(' ')}
                  <span className="text-blue-600"> {sections.story_title.split(' ').slice(-1)}</span>
                </h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  {sections.story_content.map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-8 flex items-center justify-center">
                  <div className="text-center">
                    <Building className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">15+ Years</h3>
                    <p className="text-gray-600">of Innovation & Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Modern Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {sections.values_title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {sections.values_description}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const IconComponent = iconMap[value.icon] || Target;
                return (
                  <Card key={index} className="border-0 bg-gradient-to-br from-gray-50 to-white hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline - Horizontal */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {sections.journey_title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {sections.journey_description}
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 transform -translate-y-1/2 hidden lg:block"></div>
              
              <div className="grid lg:grid-cols-5 gap-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative">
                    <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                      milestone.highlight ? 'ring-2 ring-blue-400 ring-offset-2' : ''
                    }`}>
                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                          milestone.highlight 
                            ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white' 
                            : 'bg-blue-100 text-blue-600'
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

      {/* Main About Section */}
      <About />

      {/* Clients Section */}
      <Clients />

      <ReadyToTransform />
      <Footer />
    </div>
  );
};

export default AboutPage;