
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContentStore, ContactInfo } from "@/lib/contentStore";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

const ContactEditor = () => {
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const { toast } = useToast();
  const contentStore = ContentStore.getInstance();

  useEffect(() => {
    const loadContent = async () => {
      await contentStore.loadContact();
      const siteContent = contentStore.getContent();
      setContact(siteContent.contact);
    };
    loadContent();
  }, []);

  const handleSave = async () => {
    if (contact) {
      try {
        await contentStore.updateContact(contact);
        toast({
          title: "Contact Information Updated",
          description: "Your changes have been saved successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save contact information.",
          variant: "destructive",
        });
      }
    }
  };

  const handleArrayChange = (field: keyof ContactInfo, index: number, value: string) => {
    if (contact && Array.isArray(contact[field])) {
      const updatedArray = [...(contact[field] as string[])];
      updatedArray[index] = value;
      setContact({ ...contact, [field]: updatedArray });
    }
  };

  const addArrayItem = (field: keyof ContactInfo) => {
    if (contact && Array.isArray(contact[field])) {
      const updatedArray = [...(contact[field] as string[]), ""];
      setContact({ ...contact, [field]: updatedArray });
    }
  };

  const removeArrayItem = (field: keyof ContactInfo, index: number) => {
    if (contact && Array.isArray(contact[field])) {
      const updatedArray = (contact[field] as string[]).filter((_, i) => i !== index);
      setContact({ ...contact, [field]: updatedArray });
    }
  };

  if (!contact) return <div>Loading...</div>;

  const renderArrayEditor = (field: keyof ContactInfo, label: string, placeholder: string) => {
    if (!contact || !Array.isArray(contact[field])) return null;
    
    return (
      <div>
        <Label>{label}</Label>
        <div className="space-y-2">
          {(contact[field] as string[]).map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={item}
                onChange={(e) => handleArrayChange(field, index, e.target.value)}
                placeholder={placeholder}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeArrayItem(field, index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => addArrayItem(field)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add {label.slice(0, -1)}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderArrayEditor('phone', 'Phone Numbers', '+234 XXX XXX XXXX')}
      {renderArrayEditor('email', 'Email Addresses', 'info@wellstocked.ng')}
      {renderArrayEditor('address', 'Addresses', 'Lagos, Nigeria')}
      {renderArrayEditor('business_hours', 'Business Hours', 'Monday - Friday: 8:00 AM - 6:00 PM')}

      <Button onClick={handleSave} className="w-full">
        Save Contact Information
      </Button>
    </div>
  );
};

export default ContactEditor;
