import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Award, Globe, Target, Eye, Heart, Zap, Shield, Rocket } from "lucide-react";
import { ContentStore, AboutContent } from "@/lib/contentStore";

const About = () => {
  const [about, setAbout] = useState<AboutContent | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      const contentStore = ContentStore.getInstance();
      await contentStore.loadContent();
      const siteContent = contentStore.getContent();
      setAbout(siteContent.about);
    };
    loadContent();
  }, []);

  // Fallback content while loading
  const aboutContent = about || {
    title: "About WELLSTOCKED",
    description: "WELLSTOCKED is a leading provider of premium quality products and services. With years of experience in the industry, we have built a reputation for excellence, reliability, and customer satisfaction.",
    mission: "To provide our clients with the highest quality products and services while maintaining the highest standards of integrity and professionalism.",
    vision: "To be the most trusted and respected provider of quality products and services in our industry.",
    values: ["Quality Excellence", "Customer Focus", "Integrity", "Innovation", "Reliability"]
  };

  const valueIcons = [Heart, Zap, Shield, Rocket, Award];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background with gradient and patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-400/10 to-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-white/80 text-sm font-medium mb-6 border border-white/20">
            <Rocket className="h-4 w-4" />
            About Our Company
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            {aboutContent.title}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {aboutContent.description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {[
            { icon: Building2, title: "15+", subtitle: "Years Experience", color: "from-purple-500 to-pink-500" },
            { icon: Users, title: "500+", subtitle: "Happy Clients", color: "from-blue-500 to-cyan-500" },
            { icon: Award, title: "98%", subtitle: "Success Rate", color: "from-green-500 to-emerald-500" },
            { icon: Globe, title: "24/7", subtitle: "Support", color: "from-orange-500 to-red-500" }
          ].map((stat, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" style={{ background: `linear-gradient(135deg, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})` }}></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover-glow hover:bg-white/15 transition-all duration-300 text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{stat.title}</h3>
                <p className="text-white/70 font-medium">{stat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {/* Mission */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Card className="relative bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 rounded-3xl overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 leading-relaxed text-center">{aboutContent.mission}</p>
              </CardContent>
            </Card>
          </div>

          {/* Vision */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Card className="relative bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 rounded-3xl overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 leading-relaxed text-center">{aboutContent.vision}</p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Card className="relative bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 rounded-3xl overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aboutContent.values.map((value, index) => {
                    const IconComponent = valueIcons[index % valueIcons.length];
                    return (
                      <div key={index} className="flex items-center gap-3 group/item">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-white/90 font-medium">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;