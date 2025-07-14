
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Settings, Eye, Save, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { ContentStore } from "@/lib/contentStore";
import HeroEditor from "@/components/admin/HeroEditor";
import ServicesEditor from "@/components/admin/ServicesEditor";
import ProductsEditor from "@/components/admin/ProductsEditor";
import AboutEditor from "@/components/admin/AboutEditor";
import ContactEditor from "@/components/admin/ContactEditor";
import { useToast } from "@/hooks/use-toast";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const { toast } = useToast();
  const contentStore = ContentStore.getInstance();

  const handleResetContent = () => {
    if (confirm("Are you sure you want to reset all content to default? This action cannot be undone.")) {
      contentStore.resetToDefault();
      toast({
        title: "Content Reset",
        description: "All content has been reset to default values.",
      });
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Settings className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">WSN Admin Dashboard</h1>
              <p className="text-gray-600">Manage your website content</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Site
              </Button>
            </Link>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleResetContent}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset All
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Content Sections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeTab === "hero" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("hero")}
                >
                  Hero Section
                </Button>
                <Button
                  variant={activeTab === "services" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("services")}
                >
                  Services
                </Button>
                <Button
                  variant={activeTab === "products" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("products")}
                >
                  Products
                </Button>
                <Button
                  variant={activeTab === "about" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("about")}
                >
                  About
                </Button>
                <Button
                  variant={activeTab === "contact" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("contact")}
                >
                  Contact
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl capitalize">
                    Edit {activeTab} Content
                  </CardTitle>
                  <Badge variant="outline">
                    Auto-saved
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {activeTab === "hero" && <HeroEditor />}
                {activeTab === "services" && <ServicesEditor />}
                {activeTab === "products" && <ProductsEditor />}
                {activeTab === "about" && <AboutEditor />}
                {activeTab === "contact" && <ContactEditor />}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
