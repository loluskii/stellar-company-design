
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import About from "@/components/About";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Services />
      <Products />
      <About />
      <Clients />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
