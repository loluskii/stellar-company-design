import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Award, Globe, Target, Eye, Heart, CheckCircle, ArrowRight, Lightbulb } from "lucide-react";
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

  const valueIcons = [Heart, CheckCircle, Lightbulb, Award, Target];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Creative geometric background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 border-4 border-blue-100 rounded-full opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 border-4 border-purple-100 rounded-full opacity-40"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 border-2 border-green-100 rotate-45 opacity-50"></div>
        <div className="absolute top-20 left-1/2 w-32 h-32 bg-yellow-100 rounded-full opacity-30"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Creative Header Section */}
        <div className="text-center mb-20">
          <div className="inline-block relative mb-6">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rotate-45"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-purple-500 rounded-full"></div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 relative">
              {aboutContent.title}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute -left-8 top-0 w-1 h-full bg-blue-500"></div>
            <p className="text-xl text-gray-600 leading-relaxed pl-8">
              {aboutContent.description}
            </p>
          </div>
        </div>

        {/* Creative Stats Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            { icon: Building2, title: "15+", subtitle: "Years Experience", color: "blue", shape: "circle" },
            { icon: Users, title: "500+", subtitle: "Happy Clients", color: "purple", shape: "square" },
            { icon: Award, title: "98%", subtitle: "Success Rate", color: "green", shape: "diamond" },
            { icon: Globe, title: "24/7", subtitle: "Support", color: "orange", shape: "hexagon" }
          ].map((stat, index) => (
            <div key={index} className="group relative">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden">
                {/* Creative shape backgrounds */}
                {stat.shape === "circle" && (
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full opacity-50"></div>
                )}
                {stat.shape === "square" && (
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-purple-50 rotate-45 opacity-50"></div>
                )}
                {stat.shape === "diamond" && (
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-green-50 rotate-45 opacity-50"></div>
                )}
                {stat.shape === "hexagon" && (
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-orange-50 rounded-full opacity-50"></div>
                )}
                
                <div className={`w-16 h-16 bg-${stat.color}-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2 relative z-10">{stat.title}</h3>
                <p className="text-gray-600 font-medium relative z-10">{stat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Creative Three Column Layout */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Mission */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rotate-45"></div>
            <Card className="bg-white border-2 border-blue-100 hover:border-blue-300 transition-colors duration-300 rounded-3xl overflow-hidden h-full">
              <CardHeader className="bg-blue-50 text-center relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -translate-y-12 translate-x-12 opacity-50"></div>
                <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 relative z-10">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-gray-600 leading-relaxed text-center">{aboutContent.mission}</p>
              </CardContent>
            </Card>
          </div>

          {/* Vision */}
          <div className="relative lg:mt-8">
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-purple-500 rounded-full"></div>
            <Card className="bg-white border-2 border-purple-100 hover:border-purple-300 transition-colors duration-300 rounded-3xl overflow-hidden h-full">
              <CardHeader className="bg-purple-50 text-center relative">
                <div className="absolute top-0 left-0 w-20 h-20 bg-purple-100 rotate-45 -translate-y-10 -translate-x-10 opacity-50"></div>
                <div className="w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10">
                  <Eye className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 relative z-10">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-gray-600 leading-relaxed text-center">{aboutContent.vision}</p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="relative">
            <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-green-500 rotate-45"></div>
            <Card className="bg-white border-2 border-green-100 hover:border-green-300 transition-colors duration-300 rounded-3xl overflow-hidden h-full">
              <CardHeader className="bg-green-50 text-center relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-green-100 rounded-full -translate-y-8 translate-x-8 opacity-50"></div>
                <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 relative z-10">Our Values</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {aboutContent.values.map((value, index) => {
                    const IconComponent = valueIcons[index % valueIcons.length];
                    return (
                      <div key={index} className="flex items-center gap-4 group/item">
                        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">{value}</span>
                        <ArrowRight className="h-4 w-4 text-green-500 ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" />
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