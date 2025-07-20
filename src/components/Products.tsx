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

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Product Categories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of quality office equipment and automation solutions, 
            carefully selected from trusted global brands.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((category, index) => (
            <Card key={category.id || index} className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-gray-900">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{category.description}</p>
                {category.image_url && (
                  <div className="mb-4">
                    <img 
                      src={category.image_url} 
                      alt={category.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;