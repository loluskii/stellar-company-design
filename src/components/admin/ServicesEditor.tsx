
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentStore, ServiceItem } from "@/lib/contentStore";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

const ServicesEditor = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const { toast } = useToast();
  const contentStore = ContentStore.getInstance();

  useEffect(() => {
    const loadContent = async () => {
      await contentStore.loadServices();
      const siteContent = contentStore.getContent();
      setServices(siteContent.services);
    };
    loadContent();
  }, []);

  const handleSave = () => {
    contentStore.updateServices(services);
    toast({
      title: "Services Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleServiceChange = (index: number, field: keyof ServiceItem, value: string | string[]) => {
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setServices(updatedServices);
  };

  const handleFeatureChange = (serviceIndex: number, featureIndex: number, value: string) => {
    const updatedServices = [...services];
    const updatedFeatures = [...updatedServices[serviceIndex].features];
    updatedFeatures[featureIndex] = value;
    updatedServices[serviceIndex].features = updatedFeatures;
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

  const addService = () => {
    const newService: ServiceItem = {
      id: Date.now().toString(),
      title: "",
      description: "",
      features: [""],
      icon: "Settings"
    };
    setServices([...services, newService]);
  };

  const removeService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  return (
    <div className="space-y-6">
      {services.map((service, index) => (
        <Card key={service.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Service {index + 1}</CardTitle>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeService(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor={`title-${index}`}>Title</Label>
              <Input
                id={`title-${index}`}
                value={service.title}
                onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                placeholder="Service title"
              />
            </div>

            <div>
              <Label htmlFor={`description-${index}`}>Description</Label>
              <Textarea
                id={`description-${index}`}
                value={service.description}
                onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
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
                      onChange={(e) => handleFeatureChange(index, featureIndex, e.target.value)}
                      placeholder="Feature"
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

      <div className="flex gap-4">
        <Button onClick={addService} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
        <Button onClick={handleSave} className="flex-1">
          Save Services
        </Button>
      </div>
    </div>
  );
};

export default ServicesEditor;
