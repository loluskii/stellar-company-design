import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ContentStore, 
  ServicesPageSections, 
  ServicesPageBenefit,
  ServicesPageFeature,
  ServicesPageProcess
} from "@/lib/contentStore";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

const ServicesPageEditor = () => {
  const [sections, setSections] = useState<ServicesPageSections | null>(null);
  const [benefits, setBenefits] = useState<ServicesPageBenefit[]>([]);
  const [features, setFeatures] = useState<ServicesPageFeature[]>([]);
  const [process, setProcess] = useState<ServicesPageProcess[]>([]);
  const { toast } = useToast();
  const contentStore = ContentStore.getInstance();

  useEffect(() => {
    const loadContent = async () => {
      await contentStore.loadServicesPage();
      const siteContent = contentStore.getContent();
      setSections(siteContent.servicesPage.sections);
      setBenefits(siteContent.servicesPage.benefits);
      setFeatures(siteContent.servicesPage.features);
      setProcess(siteContent.servicesPage.process);
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

  const handleSaveFeatures = async () => {
    try {
      await contentStore.updateServicesPageFeatures(features);
      toast({
        title: "Services Page Features Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save services page features.",
        variant: "destructive",
      });
    }
  };

  const handleSaveProcess = async () => {
    try {
      await contentStore.updateServicesPageProcess(process);
      toast({
        title: "Services Page Process Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save services page process.",
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

  const addFeature = () => {
    setFeatures([...features, { icon: "", title: "", description: "", features: [] }]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const addProcess = () => {
    setProcess([...process, { step_number: process.length + 1, title: "", description: "", icon: "" }]);
  };

  const removeProcess = (index: number) => {
    setProcess(process.filter((_, i) => i !== index));
  };

  if (!sections) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="hero_title">Hero Title</Label>
            <Input
              id="hero_title"
              value={sections.hero_title || ""}
              onChange={(e) => setSections({ ...sections, hero_title: e.target.value })}
              placeholder="Hero section title"
            />
          </div>
          <div>
            <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
            <Input
              id="hero_subtitle"
              value={sections.hero_subtitle || ""}
              onChange={(e) => setSections({ ...sections, hero_subtitle: e.target.value })}
              placeholder="Hero section subtitle"
            />
          </div>
          <div>
            <Label htmlFor="hero_description">Hero Description</Label>
            <Textarea
              id="hero_description"
              value={sections.hero_description || ""}
              onChange={(e) => setSections({ ...sections, hero_description: e.target.value })}
              placeholder="Hero section description"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="features_title">Features Title</Label>
            <Input
              id="features_title"
              value={sections.features_title || ""}
              onChange={(e) => setSections({ ...sections, features_title: e.target.value })}
              placeholder="Features section title"
            />
          </div>
          <div>
            <Label htmlFor="features_description">Features Description</Label>
            <Textarea
              id="features_description"
              value={sections.features_description || ""}
              onChange={(e) => setSections({ ...sections, features_description: e.target.value })}
              placeholder="Features section description"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

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

      <Card>
        <CardHeader>
          <CardTitle>Process Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="process_title">Process Title</Label>
            <Input
              id="process_title"
              value={sections.process_title || ""}
              onChange={(e) => setSections({ ...sections, process_title: e.target.value })}
              placeholder="Process section title"
            />
          </div>
          <div>
            <Label htmlFor="process_description">Process Description</Label>
            <Textarea
              id="process_description"
              value={sections.process_description || ""}
              onChange={(e) => setSections({ ...sections, process_description: e.target.value })}
              placeholder="Process section description"
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

      {/* Features List */}
      <Card>
        <CardHeader>
          <CardTitle>Service Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label>Icon</Label>
                      <Input
                        value={feature.icon}
                        onChange={(e) => {
                          const updatedFeatures = [...features];
                          updatedFeatures[index] = { ...feature, icon: e.target.value };
                          setFeatures(updatedFeatures);
                        }}
                        placeholder="Icon name"
                      />
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={feature.title}
                        onChange={(e) => {
                          const updatedFeatures = [...features];
                          updatedFeatures[index] = { ...feature, title: e.target.value };
                          setFeatures(updatedFeatures);
                        }}
                        placeholder="Feature title"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <Label>Description</Label>
                    <Textarea
                      value={feature.description}
                      onChange={(e) => {
                        const updatedFeatures = [...features];
                        updatedFeatures[index] = { ...feature, description: e.target.value };
                        setFeatures(updatedFeatures);
                      }}
                      placeholder="Feature description"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Feature Points</Label>
                    <div className="space-y-2">
                      {feature.features.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex gap-2">
                          <Input
                            value={point}
                            onChange={(e) => {
                              const updatedFeatures = [...features];
                              updatedFeatures[index].features[pointIndex] = e.target.value;
                              setFeatures(updatedFeatures);
                            }}
                            placeholder="Feature point"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const updatedFeatures = [...features];
                              updatedFeatures[index].features.splice(pointIndex, 1);
                              setFeatures(updatedFeatures);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const updatedFeatures = [...features];
                          updatedFeatures[index].features.push("");
                          setFeatures(updatedFeatures);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Feature Point
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={addFeature}>
              <Plus className="h-4 w-4 mr-2" />
              Add Feature
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSaveFeatures} className="w-full">
        Save Features
      </Button>

      {/* Process Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Process Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {process.map((step, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label>Step Number</Label>
                      <Input
                        type="number"
                        value={step.step_number}
                        onChange={(e) => {
                          const updatedProcess = [...process];
                          updatedProcess[index] = { ...step, step_number: parseInt(e.target.value) || 1 };
                          setProcess(updatedProcess);
                        }}
                        placeholder="Step number"
                      />
                    </div>
                    <div>
                      <Label>Icon</Label>
                      <Input
                        value={step.icon}
                        onChange={(e) => {
                          const updatedProcess = [...process];
                          updatedProcess[index] = { ...step, icon: e.target.value };
                          setProcess(updatedProcess);
                        }}
                        placeholder="Icon name"
                      />
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={step.title}
                        onChange={(e) => {
                          const updatedProcess = [...process];
                          updatedProcess[index] = { ...step, title: e.target.value };
                          setProcess(updatedProcess);
                        }}
                        placeholder="Process step title"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeProcess(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>Description</Label>
                    <Textarea
                      value={step.description}
                      onChange={(e) => {
                        const updatedProcess = [...process];
                        updatedProcess[index] = { ...step, description: e.target.value };
                        setProcess(updatedProcess);
                      }}
                      placeholder="Process step description"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={addProcess}>
              <Plus className="h-4 w-4 mr-2" />
              Add Process Step
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSaveProcess} className="w-full">
        Save Process Steps
      </Button>
    </div>
  );
};

export default ServicesPageEditor;