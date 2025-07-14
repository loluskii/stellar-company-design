
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    const siteContent = contentStore.getContent();
    setProducts(siteContent.products);
  }, []);

  const handleSave = () => {
    contentStore.updateProducts(products);
    toast({
      title: "Products Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCategoryChange = (index: number, field: keyof ProductCategory, value: string | string[]) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setProducts(updatedProducts);
  };

  const handleItemChange = (categoryIndex: number, itemIndex: number, value: string) => {
    const updatedProducts = [...products];
    const updatedItems = [...updatedProducts[categoryIndex].items];
    updatedItems[itemIndex] = value;
    updatedProducts[categoryIndex].items = updatedItems;
    setProducts(updatedProducts);
  };

  const addItem = (categoryIndex: number) => {
    const updatedProducts = [...products];
    updatedProducts[categoryIndex].items.push("");
    setProducts(updatedProducts);
  };

  const removeItem = (categoryIndex: number, itemIndex: number) => {
    const updatedProducts = [...products];
    updatedProducts[categoryIndex].items.splice(itemIndex, 1);
    setProducts(updatedProducts);
  };

  const addCategory = () => {
    const newCategory: ProductCategory = {
      id: Date.now().toString(),
      title: "",
      items: [""]
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
        <Card key={category.id}>
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
              <Label htmlFor={`title-${index}`}>Category Title</Label>
              <Input
                id={`title-${index}`}
                value={category.title}
                onChange={(e) => handleCategoryChange(index, 'title', e.target.value)}
                placeholder="Category title"
              />
            </div>

            <div>
              <Label>Products</Label>
              <div className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => handleItemChange(index, itemIndex, e.target.value)}
                      placeholder="Product name"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(index, itemIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addItem(index)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
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
