import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentStore, ServiceItem } from "@/lib/contentStore";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, GripVertical } from "lucide-react";

const HomeServicesEditor = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const { toast } = useToast();
  const contentStore = ContentStore.getInstance();

  useEffect(() => {
    const loadContent = async () => {
      await contentStore.loadHomeServices();
      const siteContent = contentStore.getContent();
      setServices(siteContent.homeServices);
    };
    loadContent();
  }, []);

  const handleSave = async () => {
    try {
      await contentStore.updateHomeServices(services);
      toast({
        title: "Home Services Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save home services.",
        variant: "destructive",
      });
    }
  };

  const addService = () => {
    setServices([...services, { title: "", description: "", features: [], icon: "" }]);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const updateService = (index: number, field: keyof ServiceItem, value: any) => {
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setServices(updatedServices);
  };

  const addFeature = (serviceIndex: number) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex].features.push("");
    setServices(updatedServices);
  };

  const removeFeature = (serviceIndex: number, featureIndex: number) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex].features.splice(featureIndex, 1);
    setServices(updatedServices);
  };

  const updateFeature = (serviceIndex: number, featureIndex: number, value: string) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex].features[featureIndex] = value;
    setServices(updatedServices);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Home Page Services</h2>
        <Button onClick={addService}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="space-y-6">
        {services.map((service, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400" />
                  Service {index + 1}
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeService(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={service.title}
                    onChange={(e) => updateService(index, 'title', e.target.value)}
                    placeholder="Service title"
                  />
                </div>
                <div>
                  <Label>Icon</Label>
                  <Input
                    value={service.icon}
                    onChange={(e) => updateService(index, 'icon', e.target.value)}
                    placeholder="Icon name (e.g., Printer)"
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={service.description}
                  onChange={(e) => updateService(index, 'description', e.target.value)}
                  placeholder="Service description"
                  rows={3}
                />
              </div>
              <div>
                <Label>Features</Label>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, featureIndex, e.target.value)}
                        placeholder="Feature description"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(index, featureIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addFeature(index)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Home Services
      </Button>
    </div>
  );
};

export default HomeServicesEditor;