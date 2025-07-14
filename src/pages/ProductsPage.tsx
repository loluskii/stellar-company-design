
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Products from "@/components/Products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Printer, Monitor, Server, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const featuredProducts = [
    {
      icon: Printer,
      name: "Digital Multifunction Copiers",
      description: "High-speed copying, printing, and scanning solutions",
      features: ["Color & Monochrome", "Network Ready", "Mobile Printing", "Security Features"],
      image: "/placeholder.svg"
    },
    {
      icon: Monitor,
      name: "Interactive Display Systems",
      description: "Modern presentation and collaboration solutions",
      features: ["4K Resolution", "Touch Interface", "Wireless Connectivity", "Multi-Device Support"],
      image: "/placeholder.svg"
    },
    {
      icon: Server,
      name: "IT Infrastructure",
      description: "Complete computer systems and networking equipment",
      features: ["Enterprise Grade", "Scalable Solutions", "24/7 Monitoring", "Cloud Integration"],
      image: "/placeholder.svg"
    },
    {
      icon: Phone,
      name: "Communication Systems",
      description: "PABX and telecommunication equipment",
      features: ["VoIP Ready", "Call Management", "Conference Features", "Mobile Integration"],
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 gradient-text">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive range of quality office equipment and automation solutions 
            from leading manufacturers worldwide
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and innovative solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featuredProducts.map((product, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
                  <product.icon className="h-16 w-16 text-blue-600" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">{product.name}</CardTitle>
                  <p className="text-gray-600">{product.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {product.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Link to="/contact">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                      Request Quote
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <Products />

      {/* Brands Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Authorized Dealer
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            We are proud authorized dealers of leading global brands
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Brand {i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
