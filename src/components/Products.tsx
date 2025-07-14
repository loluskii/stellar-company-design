
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const productCategories = [
  {
    title: "Digital Multifunction Systems",
    items: ["High-Speed Copiers", "All-in-One Printers", "Document Scanners", "Digital Duplicators"]
  },
  {
    title: "Office Automation",
    items: ["Computer Systems", "Office Furniture", "Air Conditioners", "Note Counting Machines"]
  },
  {
    title: "Communication Systems",
    items: ["PABX Systems", "Telecommunication Equipment", "Video Walls", "Interactive Displays"]
  },
  {
    title: "Power & Infrastructure",
    items: ["UPS Systems", "Inverter Batteries", "Server Racks", "Networking Equipment"]
  }
];

const Products = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Product Categories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive range of office equipment and automation solutions from leading manufacturers
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productCategories.map((category, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50 group-hover:from-blue-100 group-hover:to-teal-100 transition-all duration-300">
                <CardTitle className="text-lg text-gray-900 text-center">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-gray-700 text-sm">{item}</span>
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                        Available
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
