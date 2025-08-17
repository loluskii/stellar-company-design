import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Settings, Eye, Save, RotateCcw, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ContentStore } from "@/lib/contentStore";
import HeroEditor from "@/components/admin/HeroEditor";
import ServicesEditor from "@/components/admin/ServicesEditor";
import ProductsEditor from "@/components/admin/ProductsEditor";
import ClientsEditor from "@/components/admin/ClientsEditor";
import AboutPageEditor from "@/components/admin/AboutPageEditor";
import ContactEditor from "@/components/admin/ContactEditor";
import ServicesPageEditor from "@/components/admin/ServicesPageEditor";
import HomeServicesEditor from "@/components/admin/HomeServicesEditor";
import { useToast } from "@/hooks/use-toast";
import ProtectedRoute from "@/components/ProtectedRoute";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const { toast } = useToast();
  const navigate = useNavigate();
  const contentStore = ContentStore.getInstance();

  const handleResetContent = () => {
    if (confirm("Are you sure you want to reset all content to default? This feature is not available yet.")) {
      toast({
        title: "Not Available",
        description: "Reset functionality will be implemented later.",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate("/admin/login");
  };

  return (
    <ProtectedRoute>
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
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
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
                    variant={activeTab === "about" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("about")}
                  >
                    About Page
                  </Button>
                  <Button
                    variant={activeTab === "homeServices" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("homeServices")}
                  >
                    Home Services
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
                    variant={activeTab === "clients" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("clients")}
                  >
                    Clients
                  </Button>
                  <Button
                    variant={activeTab === "contact" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("contact")}
                  >
                    Contact
                  </Button>
                  <Button
                    variant={activeTab === "servicesPage" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("servicesPage")}
                  >
                    Services Page
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
                  {activeTab === "about" && <AboutPageEditor />}
                  {activeTab === "homeServices" && <HomeServicesEditor />}
                  {activeTab === "services" && <ServicesEditor />}
                  {activeTab === "servicesPage" && <ServicesPageEditor />}
                  {activeTab === "products" && <ProductsEditor />}
                  {activeTab === "clients" && <ClientsEditor />}
                  {activeTab === "contact" && <ContactEditor />}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminPage;
