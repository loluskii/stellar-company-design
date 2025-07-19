
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import About from "@/components/About";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 relative overflow-x-hidden">
      <Header />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10">
        {/* Floating geometric shapes with subtle background images */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop"
            alt=""
            className="w-full h-full object-cover rounded-full opacity-5"
          />
        </div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}>
          <img
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop"
            alt=""
            className="w-full h-full object-cover rounded-full opacity-5"
          />
        </div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}>
          <img
            src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=350&h=350&fit=crop"
            alt=""
            className="w-full h-full object-cover rounded-full opacity-5"
          />
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Content sections with staggered animations */}
      <div className="relative">
        <div className="animate-fade-in" style={{ animationFillMode: 'both' }}>
          <Hero />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <Services />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <Products />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          <About />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
          <Clients />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
          <Contact />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
