
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Award, Globe } from "lucide-react";

const About = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Wellstocked Nigeria Limited</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Wellstocked is a recognized, innovative, and authorized distributor of 
                quality office equipment and automation in Nigeria. Our suppliers are 
                Sharp Corporation, Panasonic Corporation, HP, Kaun EDC and Fargo etc.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We sell, distribute and provide after-sales services through our constantly 
                trained and competent engineers and sales force via our branches spread across the country.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Established</h3>
                <p className="text-gray-600">Over 20 Years</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Coverage</h3>
                <p className="text-gray-600">Nationwide</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <Users className="h-6 w-6 text-blue-500 mr-3" />
                <CardTitle className="text-lg">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To provide innovative office automation solutions with excellent service delivery, 
                  ensuring customer satisfaction and long-term partnerships across Nigeria.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-teal-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <Award className="h-6 w-6 text-teal-500 mr-3" />
                <CardTitle className="text-lg">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To be the leading provider of office equipment and automation solutions in Nigeria, 
                  recognized for quality products, exceptional service, and technological innovation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <Globe className="h-6 w-6 text-purple-500 mr-3" />
                <CardTitle className="text-lg">Our Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Operating across oil & gas, banking, telecommunications, and public sectors 
                  with branches nationwide, providing prompt response and reliable service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
