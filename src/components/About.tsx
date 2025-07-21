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

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Simple Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {aboutContent.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {aboutContent.description}
          </p>
        </div>

        {/* Simple Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-20 text-center">
          <div className="py-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">15+</h3>
            <p className="text-gray-600">Years Experience</p>
          </div>
          <div className="py-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
            <p className="text-gray-600">Happy Clients</p>
          </div>
          <div className="py-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">98%</h3>
            <p className="text-gray-600">Success Rate</p>
          </div>
          <div className="py-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">24/7</h3>
            <p className="text-gray-600">Support</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Mission */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              {aboutContent.mission}
            </p>
          </div>

          {/* Vision */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              {aboutContent.vision}
            </p>
          </div>

          {/* Values */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
            <div className="space-y-2">
              {aboutContent.values.map((value, index) => (
                <p key={index} className="text-gray-600">
                  {value}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;