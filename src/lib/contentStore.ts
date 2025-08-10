// Import JSON files directly
import heroData from '@/data/hero.json';
import aboutData from '@/data/about.json';
import servicesData from '@/data/services.json';
import productsData from '@/data/products.json';
import contactData from '@/data/contact.json';
// Simple JSON file-based content management

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  location: string;
  image_url?: string;
}

export interface AboutContent {
  title: string;
  description: string;
  mission: string;
  vision: string;
  values: string[];
}

export interface ServiceContent {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  sort_order: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  sort_order: number;
}

export interface ContactInfo {
  phone: string[];
  email: string[];
  address: string[];
  business_hours: string[];
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  services: ServiceContent[];
  products: ProductCategory[];
  contact: ContactInfo;
}

export class ContentStore {
  private static instance: ContentStore;
  private content: SiteContent | null = null;

  private constructor() {}

  static getInstance(): ContentStore {
    if (!ContentStore.instance) {
      ContentStore.instance = new ContentStore();
    }
    return ContentStore.instance;
  }

  async loadContent(): Promise<void> {
    try {
      // Load content from JSON files
      this.content = {
        hero: heroData,
        about: aboutData,
        services: servicesData,
        products: productsData,
        contact: contactData
      };
    } catch (error) {
      console.error('Error loading content:', error);
      this.content = this.getDefaultContent();
    }
  }

  getContent(): SiteContent {
    return this.content || this.getDefaultContent();
  }

  // Note: To update content, edit the JSON files in src/data/ directly
  // The changes will be reflected after refreshing the page

  private getDefaultContent(): SiteContent {
    return {
      hero: {
        title: "Wellstocked Nigeria Limited",
        subtitle: "Your Trusted Partner in Office Equipment & Automation",
        description: "Contractor, importer and authorized distributor of quality office equipment and automation in Nigeria with over 29 years of experience.",
        phone: "01-2702549",
        email: "info@wellstockednig.com",
        location: "Lekki Phase I, Lagos"
      },
      about: {
        title: "About Wellstocked Nigeria Limited",
        description: "Wellstocked is a contractor, importer and authorized distributor of quality office equipment and automation in Nigeria.",
        mission: "To provide quality office equipment and automation solutions.",
        vision: "To be the leading distributor of office equipment in Nigeria.",
        values: ["Quality", "Service", "Reliability"]
      },
      services: [],
      products: [],
      contact: {
        phone: ["01-2702549"],
        email: ["info@wellstockednig.com"],
        address: ["Lagos, Nigeria"],
        business_hours: ["Monday - Friday: 9:00 AM - 5:00 PM"]
      }
    };
  }
}

// Legacy exports for compatibility
export type { ServiceContent as ServiceItem };