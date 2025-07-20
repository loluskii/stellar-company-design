import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Award, Globe } from "lucide-react";
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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{aboutContent.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {aboutContent.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Established</h3>
                <p className="text-gray-600">Years of Experience</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Clients</h3>
                <p className="text-gray-600">Satisfied Customers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Quality</h3>
                <p className="text-gray-600">Premium Standards</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Reach</h3>
                <p className="text-gray-600">Nationwide Coverage</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{aboutContent.mission}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{aboutContent.vision}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {aboutContent.values.map((value, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {value}
                    </span>
                  ))}
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