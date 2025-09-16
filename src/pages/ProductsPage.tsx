import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadyToTransform from "@/components/ReadyToTransform";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Printer, Settings, Monitor, Phone, CheckCircle } from "lucide-react";
import productsData from "@/data/products.json";

const ProductsPage = () => {
  const [productsContent, setProductsContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProductsContent(productsData);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const iconMap: { [key: string]: any } = {
    Printer, Settings, Monitor, Phone, CheckCircle
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  const sections = productsContent?.sections;
  const products = productsContent?.products || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
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
          </div>
        </div>
      </section>

      {/* Products Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {products.map((product, productIndex) => (
                  <Card key={productIndex} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">Key Features:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {product.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>


            </div>
          </div>
        </div>
      </section>

      <ReadyToTransform />
      <Footer />
    </div>
  );
};

export default ProductsPage;