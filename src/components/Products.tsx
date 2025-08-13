import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContentStore, ProductCategory } from "@/lib/contentStore";

const Products = () => {
  const [products, setProducts] = useState<ProductCategory[]>([]);

  useEffect(() => {
    const loadContent = async () => {
      const contentStore = ContentStore.getInstance();
      await contentStore.loadContent();
      const siteContent = contentStore.getContent();
      setProducts(siteContent.products);
    };
    loadContent();
  }, []);

  // Fallback products while loading
  const fallbackProducts: ProductCategory[] = [
    {
      name: "Office Equipment",
      description: "Complete range of office equipment for modern businesses",
      image_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop"
    },
    {
      name: "IT Solutions", 
      description: "Advanced technology solutions and networking equipment",
      image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop"
    },
    {
      name: "Automation Systems",
      description: "Cutting-edge automation and control systems",
      image_url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop"
    }
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of premium quality products and solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map((product, index) => (
            <Card key={product.name || index} className="group hover-glow border-0 bg-white shadow-lg">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={product.image_url || `https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop`}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                  Available Now
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;