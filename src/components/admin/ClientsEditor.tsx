import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentStore, ClientItem } from "@/lib/contentStore";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

const ClientsEditor = () => {
  const [clients, setClients] = useState<ClientItem[]>([]);
  const { toast } = useToast();
  const contentStore = ContentStore.getInstance();

  useEffect(() => {
    const loadContent = async () => {
      await contentStore.loadContent();
      const siteContent = contentStore.getContent();
      setClients(siteContent.clients);
    };
    loadContent();
  }, []);

  const handleSave = async () => {
    try {
      await contentStore.updateClients(clients);
      toast({
        title: "Success",
        description: "Clients updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save clients.",
        variant: "destructive",
      });
    }
  };

  const handleClientChange = (index: number, field: keyof ClientItem, value: string) => {
    const updatedClients = [...clients];
    updatedClients[index] = { ...updatedClients[index], [field]: value };
    setClients(updatedClients);
  };

  const addClient = () => {
    const newClient: ClientItem = {
      name: "",
      logo_url: "",
      sort_order: clients.length
    };
    setClients([...clients, newClient]);
  };

  const removeClient = (index: number) => {
    const updatedClients = clients.filter((_, i) => i !== index);
    setClients(updatedClients);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Clients Management</h2>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      <div className="space-y-4">
        {clients.map((client, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Client {index + 1}</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeClient(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor={`client-name-${index}`}>Client Name</Label>
                <Input
                  id={`client-name-${index}`}
                  value={client.name}
                  onChange={(e) => handleClientChange(index, 'name', e.target.value)}
                  placeholder="Enter client name"
                />
              </div>
              
              <div>
                <Label htmlFor={`client-logo-${index}`}>Logo URL</Label>
                <Input
                  id={`client-logo-${index}`}
                  value={client.logo_url || ""}
                  onChange={(e) => handleClientChange(index, 'logo_url', e.target.value)}
                  placeholder="Enter logo URL"
                />
              </div>

              {client.logo_url && (
                <div>
                  <Label>Logo Preview</Label>
                  <div className="mt-2 p-4 border rounded-lg bg-gray-50 flex items-center justify-center">
                    <img 
                      src={client.logo_url} 
                      alt={client.name}
                      className="max-h-16 max-w-32 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={addClient} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add New Client
      </Button>
    </div>
  );
};

export default ClientsEditor;