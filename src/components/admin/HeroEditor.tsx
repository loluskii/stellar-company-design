import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ContentStore, HeroContent } from "@/lib/contentStore";
import { useToast } from "@/hooks/use-toast";

const HeroEditor = () => {
  const [content, setContent] = useState<HeroContent | null>(null);
  const { toast } = useToast();
  const contentStore = ContentStore.getInstance();

  useEffect(() => {
    const loadContent = async () => {
      await contentStore.loadContent();
      const siteContent = contentStore.getContent();
      setContent(siteContent.hero);
    };
    loadContent();
  }, []);

  const handleSave = async () => {
    if (content) {
      try {
        await contentStore.updateHero(content);
        toast({
          title: "Hero Section Updated",
          description: "Your changes have been saved successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save hero content.",
          variant: "destructive",
        });
      }
    }
  };

  const handleChange = (field: keyof HeroContent, value: string) => {
    if (content) {
      setContent({ ...content, [field]: value });
    }
  };

  if (!content) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="title">Main Title</Label>
          <Input
            id="title"
            value={content.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="WELLSTOCKED"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            value={content.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            placeholder="Premium Quality Products & Services"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={content.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Main description text..."
            rows={4}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={content.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+234 XXX XXX XXXX"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={content.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="info@wellstocked.ng"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={content.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Lagos, Nigeria"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="image_url">Image URL (optional)</Label>
          <Input
            id="image_url"
            value={content.image_url || ""}
            onChange={(e) => handleChange('image_url', e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Hero Content
      </Button>
    </div>
  );
};

export default HeroEditor;