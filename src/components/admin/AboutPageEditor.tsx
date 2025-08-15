import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ContentStore, 
  AboutPageSections, 
  AboutPageStat, 
  AboutPageValue, 
  AboutPageMilestone 
} from "@/lib/contentStore";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

const AboutPageEditor = () => {
  const [sections, setSections] = useState<AboutPageSections | null>(null);
  const [stats, setStats] = useState<AboutPageStat[]>([]);
  const [values, setValues] = useState<AboutPageValue[]>([]);
  const [milestones, setMilestones] = useState<AboutPageMilestone[]>([]);
  const { toast } = useToast();
  const contentStore = ContentStore.getInstance();

  useEffect(() => {
    const loadContent = async () => {
      await contentStore.loadContent();
      const siteContent = contentStore.getContent();
      setSections(siteContent.aboutPage.sections);
      setStats(siteContent.aboutPage.stats);
      setValues(siteContent.aboutPage.values);
      setMilestones(siteContent.aboutPage.milestones);
    };
    loadContent();
  }, []);

  const handleSaveSections = async () => {
    if (sections) {
      try {
        await contentStore.updateAboutPageSections(sections);
        toast({
          title: "About Page Sections Updated",
          description: "Your changes have been saved successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save about page sections.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSaveStats = async () => {
    try {
      await contentStore.updateAboutPageStats(stats);
      toast({
        title: "About Page Stats Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save about page stats.",
        variant: "destructive",
      });
    }
  };

  const handleSaveValues = async () => {
    try {
      await contentStore.updateAboutPageValues(values);
      toast({
        title: "About Page Values Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save about page values.",
        variant: "destructive",
      });
    }
  };

  const handleSaveMilestones = async () => {
    try {
      await contentStore.updateAboutPageMilestones(milestones);
      toast({
        title: "About Page Milestones Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save about page milestones.",
        variant: "destructive",
      });
    }
  };

  const addStat = () => {
    setStats([...stats, { icon: "", number: "", label: "" }]);
  };

  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const addValue = () => {
    setValues([...values, { icon: "", title: "", description: "" }]);
  };

  const removeValue = (index: number) => {
    setValues(values.filter((_, i) => i !== index));
  };

  const addMilestone = () => {
    setMilestones([...milestones, { year: "", title: "", description: "", highlight: false }]);
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const handleStoryContentChange = (index: number, value: string) => {
    if (sections) {
      const updatedContent = [...sections.story_content];
      updatedContent[index] = value;
      setSections({ ...sections, story_content: updatedContent });
    }
  };

  const addStoryParagraph = () => {
    if (sections) {
      setSections({ ...sections, story_content: [...sections.story_content, ""] });
    }
  };

  const removeStoryParagraph = (index: number) => {
    if (sections) {
      const updatedContent = sections.story_content.filter((_, i) => i !== index);
      setSections({ ...sections, story_content: updatedContent });
    }
  };

  if (!sections) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sections" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="values">Values</TabsTrigger>
          <TabsTrigger value="milestones">Journey</TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hero_title">Hero Title</Label>
                <Input
                  id="hero_title"
                  value={sections.hero_title}
                  onChange={(e) => setSections({ ...sections, hero_title: e.target.value })}
                  placeholder="Hero title"
                />
              </div>
              <div>
                <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
                <Input
                  id="hero_subtitle"
                  value={sections.hero_subtitle}
                  onChange={(e) => setSections({ ...sections, hero_subtitle: e.target.value })}
                  placeholder="Hero subtitle"
                />
              </div>
              <div>
                <Label htmlFor="hero_description">Hero Description</Label>
                <Textarea
                  id="hero_description"
                  value={sections.hero_description}
                  onChange={(e) => setSections({ ...sections, hero_description: e.target.value })}
                  placeholder="Hero description"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company Story Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="story_title">Story Title</Label>
                <Input
                  id="story_title"
                  value={sections.story_title}
                  onChange={(e) => setSections({ ...sections, story_title: e.target.value })}
                  placeholder="Story title"
                />
              </div>
              <div>
                <Label>Story Paragraphs</Label>
                <div className="space-y-2">
                  {sections.story_content.map((paragraph, index) => (
                    <div key={index} className="flex gap-2">
                      <Textarea
                        value={paragraph}
                        onChange={(e) => handleStoryContentChange(index, e.target.value)}
                        placeholder={`Paragraph ${index + 1}`}
                        rows={3}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeStoryParagraph(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addStoryParagraph}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Paragraph
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Values & Journey Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="values_title">Values Section Title</Label>
                <Input
                  id="values_title"
                  value={sections.values_title}
                  onChange={(e) => setSections({ ...sections, values_title: e.target.value })}
                  placeholder="Values section title"
                />
              </div>
              <div>
                <Label htmlFor="values_description">Values Section Description</Label>
                <Textarea
                  id="values_description"
                  value={sections.values_description}
                  onChange={(e) => setSections({ ...sections, values_description: e.target.value })}
                  placeholder="Values section description"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="journey_title">Journey Section Title</Label>
                <Input
                  id="journey_title"
                  value={sections.journey_title}
                  onChange={(e) => setSections({ ...sections, journey_title: e.target.value })}
                  placeholder="Journey section title"
                />
              </div>
              <div>
                <Label htmlFor="journey_description">Journey Section Description</Label>
                <Textarea
                  id="journey_description"
                  value={sections.journey_description}
                  onChange={(e) => setSections({ ...sections, journey_description: e.target.value })}
                  placeholder="Journey section description"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSaveSections} className="w-full">
            Save Sections Content
          </Button>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label>Icon</Label>
                      <Input
                        value={stat.icon}
                        onChange={(e) => {
                          const updatedStats = [...stats];
                          updatedStats[index] = { ...stat, icon: e.target.value };
                          setStats(updatedStats);
                        }}
                        placeholder="Icon name (e.g., Users)"
                      />
                    </div>
                    <div>
                      <Label>Number</Label>
                      <Input
                        value={stat.number}
                        onChange={(e) => {
                          const updatedStats = [...stats];
                          updatedStats[index] = { ...stat, number: e.target.value };
                          setStats(updatedStats);
                        }}
                        placeholder="Number (e.g., 500+)"
                      />
                    </div>
                    <div>
                      <Label>Label</Label>
                      <Input
                        value={stat.label}
                        onChange={(e) => {
                          const updatedStats = [...stats];
                          updatedStats[index] = { ...stat, label: e.target.value };
                          setStats(updatedStats);
                        }}
                        placeholder="Label"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeStat(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" onClick={addStat}>
            <Plus className="h-4 w-4 mr-2" />
            Add Stat
          </Button>
          <Button onClick={handleSaveStats} className="w-full">
            Save Stats
          </Button>
        </TabsContent>

        <TabsContent value="values" className="space-y-6">
          <div className="grid gap-4">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label>Icon</Label>
                      <Input
                        value={value.icon}
                        onChange={(e) => {
                          const updatedValues = [...values];
                          updatedValues[index] = { ...value, icon: e.target.value };
                          setValues(updatedValues);
                        }}
                        placeholder="Icon name (e.g., Target)"
                      />
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={value.title}
                        onChange={(e) => {
                          const updatedValues = [...values];
                          updatedValues[index] = { ...value, title: e.target.value };
                          setValues(updatedValues);
                        }}
                        placeholder="Value title"
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={value.description}
                        onChange={(e) => {
                          const updatedValues = [...values];
                          updatedValues[index] = { ...value, description: e.target.value };
                          setValues(updatedValues);
                        }}
                        placeholder="Value description"
                        rows={2}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeValue(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" onClick={addValue}>
            <Plus className="h-4 w-4 mr-2" />
            Add Value
          </Button>
          <Button onClick={handleSaveValues} className="w-full">
            Save Values
          </Button>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <div className="grid gap-4">
            {milestones.map((milestone, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <Label>Year</Label>
                      <Input
                        value={milestone.year}
                        onChange={(e) => {
                          const updatedMilestones = [...milestones];
                          updatedMilestones[index] = { ...milestone, year: e.target.value };
                          setMilestones(updatedMilestones);
                        }}
                        placeholder="Year"
                      />
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={milestone.title}
                        onChange={(e) => {
                          const updatedMilestones = [...milestones];
                          updatedMilestones[index] = { ...milestone, title: e.target.value };
                          setMilestones(updatedMilestones);
                        }}
                        placeholder="Milestone title"
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={milestone.description}
                        onChange={(e) => {
                          const updatedMilestones = [...milestones];
                          updatedMilestones[index] = { ...milestone, description: e.target.value };
                          setMilestones(updatedMilestones);
                        }}
                        placeholder="Milestone description"
                        rows={2}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`highlight-${index}`}
                        checked={milestone.highlight}
                        onCheckedChange={(checked) => {
                          const updatedMilestones = [...milestones];
                          updatedMilestones[index] = { ...milestone, highlight: checked as boolean };
                          setMilestones(updatedMilestones);
                        }}
                      />
                      <Label htmlFor={`highlight-${index}`}>Highlight</Label>
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeMilestone(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" onClick={addMilestone}>
            <Plus className="h-4 w-4 mr-2" />
            Add Milestone
          </Button>
          <Button onClick={handleSaveMilestones} className="w-full">
            Save Milestones
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AboutPageEditor;