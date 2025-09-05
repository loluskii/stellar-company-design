import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Award, Globe } from "lucide-react";
import { ContentManager, AboutContent } from "@/lib/contentManager";

const About = () => {
  const [about, setAbout] = useState<AboutContent | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      const contentManager = ContentManager.getInstance();
      await contentManager.loadAbout();
      const siteContent = contentManager.getContent();
      setAbout(siteContent.about);
    };
    loadContent();
  }, []);

  // Fallback content while loading
  const aboutContent = about || {
    title: "About WELLSTOCKED",
    description: `Wellstocked is a contractor, importer, and authorized distributor of quality office equipment and automation in Nigeria. Our suppliers include Sharp Corporation, Panasonic Corporation, HP, Katun EDC, Fargo, and more. We sell, distribute, and provide after-sales services through our constantly trained and competent engineers and sales force via our branches spread across the country. Our experience in our line of business spans over 29 years with a clientele base that cuts across Oil & Gas, Banking, Telecommunications, general business, and Public sectors. We provide services in any terrain and in any part of the country, with prompt response and minimal downtime. We focus on regular preventive maintenance and after-sales service to ensure long product life, rather than just breakdown maintenance.`,
    mission: "To provide our clients with the highest quality products and services while maintaining the highest standards of integrity and professionalism.",
    vision: "To be the most trusted and respected provider of quality products and services in our industry.",
    values: ["Quality Excellence", "Customer Focus", "Integrity", "Innovation", "Reliability", "Prompt Response", "Nationwide Reach", "Preventive Maintenance"]
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{aboutContent.title}</h2>
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                {aboutContent.description}
              </p>
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
            

            <Card className="bg-blue-50 border-blue-200 hidden">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900 flex items-center gap-2"><span>💡</span> Why Choose Us</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li>29+ years of industry experience</li>
                  <li>Authorized distributor for global brands</li>
                  <li>Nationwide branch network and support</li>
                  <li>Prompt response and minimal downtime</li>
                  <li>Preventive maintenance and after-sales service</li>
                  <li>Competent, constantly trained engineers and sales force</li>
                  <li>Trusted by top companies in Oil & Gas, Banking, Telecom, and Public sectors</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;