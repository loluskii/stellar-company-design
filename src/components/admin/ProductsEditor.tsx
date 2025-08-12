import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentStore, ProductCategory } from "@/lib/contentStore";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

const ProductsEditor = () => {
  const [products, setProducts] = useState<ProductCategory[]>([]);
  const { toast } = useToast();
  const contentStore = ContentStore.getInstance();

  useEffect(() => {
    const loadContent = async () => {
      await contentStore.loadContent();
      const siteContent = contentStore.getContent();
      setProducts(siteContent.products);
    };
    loadContent();
  }, []);

  const handleSave = async () => {
    try {
      await contentStore.updateProducts(products);
      toast({
        title: "Products Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save products.",
        variant: "destructive",
      });
    }
  };

  const handleCategoryChange = (index: number, field: keyof ProductCategory, value: string) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setProducts(updatedProducts);
  };

  const addCategory = () => {
    const newCategory: ProductCategory = {
      name: "",
      description: "",
      image_url: "",
      sort_order: products.length
    };
    setProducts([...products, newCategory]);
  };

  const removeCategory = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="space-y-6">
      {products.map((category, index) => (
        <Card key={category.id || index}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Category {index + 1}</CardTitle>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeCategory(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor={`name-${index}`}>Category Name</Label>
              <Input
                id={`name-${index}`}
                value={category.name}
                onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
                placeholder="Category name"
              />
            </div>

            <div>
              <Label htmlFor={`description-${index}`}>Description</Label>
              <Textarea
                id={`description-${index}`}
                value={category.description}
                onChange={(e) => handleCategoryChange(index, 'description', e.target.value)}
                placeholder="Category description"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor={`image_url-${index}`}>Image URL (optional)</Label>
              <Input
                id={`image_url-${index}`}
                value={category.image_url || ""}
                onChange={(e) => handleCategoryChange(index, 'image_url', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex gap-4">
        <Button onClick={addCategory} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
        <Button onClick={handleSave} className="flex-1">
          Save Products
        </Button>
      </div>
    </div>
  );
};

export default ProductsEditor;