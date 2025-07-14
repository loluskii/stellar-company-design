
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ContentStore, AboutContent } from "@/lib/contentStore";
import { useToast } from "@/hooks/use-toast";

const AboutEditor = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const { toast } = useToast();
  const contentStore = ContentStore.getInstance();

  useEffect(() => {
    const siteContent = contentStore.getContent();
    setContent(siteContent.about);
  }, []);

  const handleSave = () => {
    if (content) {
      contentStore.updateAbout(content);
      toast({
        title: "About Section Updated",
        description: "Your changes have been saved successfully.",
      });
    }
  };

  const handleChange = (field: keyof AboutContent, value: string | string[]) => {
    if (content) {
      setContent({ ...content, [field]: value });
    }
  };

  const handleDescriptionChange = (index: number, value: string) => {
    if (content) {
      const updatedDescription = [...content.description];
      updatedDescription[index] = value;
      setContent({ ...content, description: updatedDescription });
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
        <Label>Description Paragraphs</Label>
        <div className="space-y-4">
          {content.description.map((paragraph, index) => (
            <Textarea
              key={index}
              value={paragraph}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
              placeholder={`Paragraph ${index + 1}`}
              rows={4}
            />
          ))}
        </div>
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
        <Label htmlFor="reach">Company Reach</Label>
        <Textarea
          id="reach"
          value={content.reach}
          onChange={(e) => handleChange('reach', e.target.value)}
          placeholder="Company reach and coverage"
          rows={3}
        />
      </div>

      <Button onClick={handleSave} className="w-full">
        Save About Content
      </Button>
    </div>
  );
};

export default AboutEditor;
