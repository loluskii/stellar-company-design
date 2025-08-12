
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="flex flex-col items-start">
              <img src="/wsn-logo.png" alt="WSN Logo" className="h-12 w-auto mb-2" />
              <p className="text-lg text-gray-400">NIGERIA LIMITED</p>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Recognized, innovative, and authorized distributor of quality office equipment 
              and automation solutions in Nigeria.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Office Equipment Sales</li>
              <li>Leasing & Maintenance</li>
              <li>IT Solutions</li>
              <li>After-Sales Service</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Products</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Digital Copiers</li>
              <li>Office Automation</li>
              <li>Computer Systems</li>
              <li>Telecommunications</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-teal-400" />
                <span className="text-gray-400">+234 0705 063 9404</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-teal-400" />
                <span className="text-gray-400">info@wellstockedltd.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-8 w-8 text-teal-400" />
                <span className="text-gray-400">Wellstocked Mall, 1 Hakeem Dickson Link Road, Lekki Phase 1, Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-12 bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">
            © 2024 Wellstocked Nigeria Limited. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
