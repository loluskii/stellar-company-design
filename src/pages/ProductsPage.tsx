import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Products from "@/components/Products";
import ReadyToTransform from "@/components/ReadyToTransform";

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our Products
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Explore our comprehensive range of premium office equipment, IT solutions, and automation systems
          </p>
        </div>
      </section>

      {/* Main Products */}
      <Products />

      <ReadyToTransform />

      <Footer />
    </div>
  );
};

export default ProductsPage;