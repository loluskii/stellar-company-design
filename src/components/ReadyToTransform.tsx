import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ReadyToTransform = () => (
  <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-heading font-bold text-white mb-6">
        Ready to Transform Your Office?
      </h2>
      <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
        Get a personalized consultation and discover how our solutions can enhance your business operations.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/contact">
          <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 font-heading font-semibold">
            Get Free Consultation
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

export default ReadyToTransform; 