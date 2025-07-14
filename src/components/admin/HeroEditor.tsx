
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
    const siteContent = contentStore.getContent();
    setContent(siteContent.hero);
  }, []);

  const handleSave = () => {
    if (content) {
      contentStore.updateHero(content);
      toast({
        title: "Hero Section Updated",
        description: "Your changes have been saved successfully.",
      });
    }
  };

  const handleChange = (field: keyof HeroContent, value: string) => {
    if (content) {
      setContent({ ...content, [field]: value });
    }
  };

  const handleStatsChange = (field: keyof HeroContent['stats'], value: string) => {
    if (content) {
      setContent({
        ...content,
        stats: { ...content.stats, [field]: value }
      });
    }
  };

  if (!content) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="subtitle">Company Tagline</Label>
          <Input
            id="subtitle"
            value={content.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            placeholder="WSN - Wellstocked Nigeria Limited"
          />
        </div>

        <div>
          <Label htmlFor="title">Main Title</Label>
          <Input
            id="title"
            value={content.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Premium Office Equipment & Automation"
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
            <Label htmlFor="years">Years of Experience</Label>
            <Input
              id="years"
              value={content.stats.years}
              onChange={(e) => handleStatsChange('years', e.target.value)}
              placeholder="20+"
            />
          </div>
          <div>
            <Label htmlFor="clients">Clients Served</Label>
            <Input
              id="clients"
              value={content.stats.clients}
              onChange={(e) => handleStatsChange('clients', e.target.value)}
              placeholder="500+"
            />
          </div>
          <div>
            <Label htmlFor="support">Support</Label>
            <Input
              id="support"
              value={content.stats.support}
              onChange={(e) => handleStatsChange('support', e.target.value)}
              placeholder="24/7"
            />
          </div>
        </div>
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Hero Content
      </Button>
    </div>
  );
};

export default HeroEditor;
