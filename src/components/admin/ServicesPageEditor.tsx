import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ContentStore, 
  ServicesPageSections, 
  ServicesPageBenefit 
} from "@/lib/contentStore";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

const ServicesPageEditor = () => {
  const [sections, setSections] = useState<ServicesPageSections | null>(null);
  const [benefits, setBenefits] = useState<ServicesPageBenefit[]>([]);
  const { toast } = useToast();
  const contentStore = ContentStore.getInstance();

  useEffect(() => {
    const loadContent = async () => {
      await contentStore.loadContent();
      const siteContent = contentStore.getContent();
      setSections(siteContent.servicesPage.sections);
      setBenefits(siteContent.servicesPage.benefits);
    };
    loadContent();
  }, []);

  const handleSaveSections = async () => {
    if (sections) {
      try {
        await contentStore.updateServicesPageSections(sections);
        toast({
          title: "Services Page Sections Updated",
          description: "Your changes have been saved successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save services page sections.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSaveBenefits = async () => {
    try {
      await contentStore.updateServicesPageBenefits(benefits);
      toast({
        title: "Services Page Benefits Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save services page benefits.",
        variant: "destructive",
      });
    }
  };

  const addBenefit = () => {
    setBenefits([...benefits, { icon: "", title: "", description: "" }]);
  };

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  if (!sections) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Benefits Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="benefits_title">Benefits Title</Label>
            <Input
              id="benefits_title"
              value={sections.benefits_title}
              onChange={(e) => setSections({ ...sections, benefits_title: e.target.value })}
              placeholder="Benefits section title"
            />
          </div>
          <div>
            <Label htmlFor="benefits_description">Benefits Description</Label>
            <Textarea
              id="benefits_description"
              value={sections.benefits_description}
              onChange={(e) => setSections({ ...sections, benefits_description: e.target.value })}
              placeholder="Benefits section description"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSaveSections} className="w-full">
        Save Section Content
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Benefits List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label>Icon</Label>
                      <Input
                        value={benefit.icon}
                        onChange={(e) => {
                          const updatedBenefits = [...benefits];
                          updatedBenefits[index] = { ...benefit, icon: e.target.value };
                          setBenefits(updatedBenefits);
                        }}
                        placeholder="Icon name (e.g., CheckCircle)"
                      />
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={benefit.title}
                        onChange={(e) => {
                          const updatedBenefits = [...benefits];
                          updatedBenefits[index] = { ...benefit, title: e.target.value };
                          setBenefits(updatedBenefits);
                        }}
                        placeholder="Benefit title"
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={benefit.description}
                        onChange={(e) => {
                          const updatedBenefits = [...benefits];
                          updatedBenefits[index] = { ...benefit, description: e.target.value };
                          setBenefits(updatedBenefits);
                        }}
                        placeholder="Benefit description"
                        rows={2}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeBenefit(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={addBenefit}>
              <Plus className="h-4 w-4 mr-2" />
              Add Benefit
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSaveBenefits} className="w-full">
        Save Benefits
      </Button>
    </div>
  );
};

export default ServicesPageEditor;