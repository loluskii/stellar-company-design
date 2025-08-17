import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ContentStore } from "@/lib/contentStore";
import { useToast } from "@/hooks/use-toast";

const AboutPageEditor = () => {
  const [content, setContent] = useState({
    title: "",
    description: "",
    mission: "",
    vision: "",
    values: [] as string[],
  });
  const { toast } = useToast();
  const contentStore = ContentStore.getInstance();

  useEffect(() => {
    const loadContent = async () => {
      await contentStore.loadAbout();
      const aboutContent = contentStore.getContent().about;
      if (aboutContent) {
        setContent({
          title: aboutContent.title,
          description: aboutContent.description,
          mission: aboutContent.mission,
          vision: aboutContent.vision,
          values: aboutContent.values,
        });
      }
    };
    loadContent();
  }, []);

  const handleSave = async () => {
    try {
      await contentStore.updateAbout(content);
      toast({
        title: "Success",
        description: "About page content updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update about page content",
        variant: "destructive",
      });
    }
  };

  const handleChange = (field: string, value: string | string[]) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const handleValuesChange = (value: string) => {
    const valuesArray = value.split('\n').filter(v => v.trim());
    handleChange("values", valuesArray);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About Page Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Page Title</Label>
            <Input
              id="title"
              value={content.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="About Us"
            />
          </div>
          
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={content.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Brief description about your company..."
              rows={4}
            />
          </div>
          
          <div>
            <Label htmlFor="mission">Mission</Label>
            <Textarea
              id="mission"
              value={content.mission}
              onChange={(e) => handleChange("mission", e.target.value)}
              placeholder="Our mission statement..."
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="vision">Vision</Label>
            <Textarea
              id="vision"
              value={content.vision}
              onChange={(e) => handleChange("vision", e.target.value)}
              placeholder="Our vision for the future..."
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="values">Values (one per line)</Label>
            <Textarea
              id="values"
              value={Array.isArray(content.values) ? content.values.join('\n') : ''}
              onChange={(e) => handleValuesChange(e.target.value)}
              placeholder="Quality Service&#10;Customer Satisfaction&#10;Innovation"
              rows={5}
            />
          </div>
          
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPageEditor;