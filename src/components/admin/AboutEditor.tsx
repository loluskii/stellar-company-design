import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ContentStore, AboutContent } from "@/lib/contentStore";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

const AboutEditor = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const { toast } = useToast();
  const contentStore = ContentStore.getInstance();

  useEffect(() => {
    const loadContent = async () => {
      await contentStore.loadContent();
      const siteContent = contentStore.getContent();
      setContent(siteContent.about);
    };
    loadContent();
  }, []);

  const handleSave = async () => {
    if (content) {
      try {
        await contentStore.updateAbout(content);
        toast({
          title: "About Section Updated",
          description: "Your changes have been saved successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save about content.",
          variant: "destructive",
        });
      }
    }
  };

  const handleChange = (field: keyof AboutContent, value: string | string[]) => {
    if (content) {
      setContent({ ...content, [field]: value });
    }
  };

  const handleValueChange = (index: number, value: string) => {
    if (content) {
      const updatedValues = [...content.values];
      updatedValues[index] = value;
      setContent({ ...content, values: updatedValues });
    }
  };

  const addValue = () => {
    if (content) {
      setContent({ ...content, values: [...content.values, ""] });
    }
  };

  const removeValue = (index: number) => {
    if (content) {
      const updatedValues = content.values.filter((_, i) => i !== index);
      setContent({ ...content, values: updatedValues });
    }
  };

  if (!content) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">Section Title</Label>
        <Textarea
          id="title"
          value={content.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="About section title"
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={content.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Company description"
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="mission">Mission Statement</Label>
        <Textarea
          id="mission"
          value={content.mission}
          onChange={(e) => handleChange('mission', e.target.value)}
          placeholder="Company mission statement"
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="vision">Vision Statement</Label>
        <Textarea
          id="vision"
          value={content.vision}
          onChange={(e) => handleChange('vision', e.target.value)}
          placeholder="Company vision statement"
          rows={4}
        />
      </div>

      <div>
        <Label>Company Values</Label>
        <div className="space-y-2">
          {content.values.map((value, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={value}
                onChange={(e) => handleValueChange(index, e.target.value)}
                placeholder={`Value ${index + 1}`}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeValue(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addValue}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Value
          </Button>
        </div>
      </div>

      <Button onClick={handleSave} className="w-full">
        Save About Content
      </Button>
    </div>
  );
};

export default AboutEditor;