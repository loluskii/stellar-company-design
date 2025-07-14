
interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

interface ProductCategory {
  id: string;
  title: string;
  items: string[];
}

interface ContactInfo {
  phone: string[];
  email: string[];
  address: string[];
  businessHours: string[];
}

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  stats: {
    years: string;
    clients: string;
    support: string;
  };
}

interface AboutContent {
  title: string;
  description: string[];
  mission: string;
  vision: string;
  reach: string;
}

interface SiteContent {
  hero: HeroContent;
  services: ServiceItem[];
  products: ProductCategory[];
  about: AboutContent;
  contact: ContactInfo;
}

const defaultContent: SiteContent = {
  hero: {
    title: "Premium Office Equipment & Automation",
    subtitle: "WSN - Wellstocked Nigeria Limited",
    description: "We are a recognized, innovative, and authorized distributor of quality office equipment and automation solutions in Nigeria. Serving diverse sectors with excellence for over 20 years.",
    stats: {
      years: "20+",
      clients: "500+",
      support: "24/7"
    }
  },
  services: [
    {
      id: "1",
      title: "Office Equipment Sales",
      description: "Comprehensive range of quality office equipment from leading brands including copiers, printers, and business machines.",
      features: ["Authorized Dealer", "Latest Technology", "Competitive Pricing"],
      icon: "Settings"
    },
    {
      id: "2",
      title: "Leasing & Maintenance",
      description: "Flexible leasing options and comprehensive maintenance services to ensure optimal performance and minimal downtime.",
      features: ["Flexible Terms", "24/7 Support", "Preventive Maintenance"],
      icon: "Printer"
    },
    {
      id: "3",
      title: "IT Solutions",
      description: "Complete IT infrastructure solutions including computers, servers, networking equipment, and telecommunications.",
      features: ["Network Setup", "System Integration", "Technical Support"],
      icon: "Server"
    },
    {
      id: "4",
      title: "After-Sales Service",
      description: "Dedicated after-sales support with trained engineers and genuine spare parts to ensure long product life.",
      features: ["Expert Engineers", "Genuine Parts", "Quick Response"],
      icon: "Wrench"
    }
  ],
  products: [
    {
      id: "1",
      title: "Digital Multifunction Systems",
      items: ["High-Speed Copiers", "All-in-One Printers", "Document Scanners", "Digital Duplicators"]
    },
    {
      id: "2",
      title: "Office Automation",
      items: ["Computer Systems", "Office Furniture", "Air Conditioners", "Note Counting Machines"]
    },
    {
      id: "3",
      title: "Communication Systems",
      items: ["PABX Systems", "Telecommunication Equipment", "Video Walls", "Interactive Displays"]
    },
    {
      id: "4",
      title: "Power & Infrastructure",
      items: ["UPS Systems", "Inverter Batteries", "Server Racks", "Networking Equipment"]
    }
  ],
  about: {
    title: "About Wellstocked Nigeria Limited",
    description: [
      "Wellstocked is a recognized, innovative, and authorized distributor of quality office equipment and automation in Nigeria. Our suppliers are Sharp Corporation, Panasonic Corporation, HP, Kaun EDC and Fargo etc.",
      "We sell, distribute and provide after-sales services through our constantly trained and competent engineers and sales force via our branches spread across the country."
    ],
    mission: "To provide innovative office automation solutions with excellent service delivery, ensuring customer satisfaction and long-term partnerships across Nigeria.",
    vision: "To be the leading provider of office equipment and automation solutions in Nigeria, recognized for quality products, exceptional service, and technological innovation.",
    reach: "Operating across oil & gas, banking, telecommunications, and public sectors with branches nationwide, providing prompt response and reliable service."
  },
  contact: {
    phone: ["+234 XXX XXX XXXX", "+234 XXX XXX XXXX"],
    email: ["info@wellstocked.ng", "sales@wellstocked.ng"],
    address: ["Lagos, Nigeria", "Branches Nationwide"],
    businessHours: ["Monday - Friday: 8:00 AM - 6:00 PM", "24/7 Support Available"]
  }
};

export class ContentStore {
  private static instance: ContentStore;
  private content: SiteContent;

  private constructor() {
    this.loadContent();
  }

  static getInstance(): ContentStore {
    if (!ContentStore.instance) {
      ContentStore.instance = new ContentStore();
    }
    return ContentStore.instance;
  }

  private loadContent(): void {
    const stored = localStorage.getItem('wsn-site-content');
    if (stored) {
      try {
        this.content = JSON.parse(stored);
      } catch (error) {
        console.error('Error loading content:', error);
        this.content = defaultContent;
      }
    } else {
      this.content = defaultContent;
    }
  }

  private saveContent(): void {
    localStorage.setItem('wsn-site-content', JSON.stringify(this.content));
  }

  getContent(): SiteContent {
    return this.content;
  }

  updateHero(hero: HeroContent): void {
    this.content.hero = hero;
    this.saveContent();
  }

  updateServices(services: ServiceItem[]): void {
    this.content.services = services;
    this.saveContent();
  }

  updateProducts(products: ProductCategory[]): void {
    this.content.products = products;
    this.saveContent();
  }

  updateAbout(about: AboutContent): void {
    this.content.about = about;
    this.saveContent();
  }

  updateContact(contact: ContactInfo): void {
    this.content.contact = contact;
    this.saveContent();
  }

  resetToDefault(): void {
    this.content = defaultContent;
    this.saveContent();
  }
}

export type { SiteContent, ServiceItem, ProductCategory, ContactInfo, HeroContent, AboutContent };
