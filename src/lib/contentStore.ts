// Import JSON files directly
import heroData from '@/data/hero.json';
import aboutData from '@/data/about.json';
import servicesData from '@/data/services.json';
import productsData from '@/data/products.json';
import contactData from '@/data/contact.json';
import { FileManager } from './fileManager';

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

  // Method to update content files (for CMS)
  async updateHero(hero: HeroContent): Promise<void> {
    try {
      const success = await FileManager.updateContentFile('hero', hero);
      if (success && this.content) {
        this.content.hero = hero;
      } else {
        throw new Error('Failed to update hero content');
      }
    } catch (error) {
      console.error('Error updating hero:', error);
      throw error;
    }
  }

  async updateAbout(about: AboutContent): Promise<void> {
    try {
      const success = await FileManager.updateContentFile('about', about);
      if (success && this.content) {
        this.content.about = about;
      } else {
        throw new Error('Failed to update about content');
      }
    } catch (error) {
      console.error('Error updating about:', error);
      throw error;
    }
  }

  async updateServices(services: ServiceContent[]): Promise<void> {
    try {
      const success = await FileManager.updateContentFile('services', services);
      if (success && this.content) {
        this.content.services = services;
      } else {
        throw new Error('Failed to update services content');
      }
    } catch (error) {
      console.error('Error updating services:', error);
      throw error;
    }
  }

  async updateProducts(products: ProductCategory[]): Promise<void> {
    try {
      const success = await FileManager.updateContentFile('products', products);
      if (success && this.content) {
        this.content.products = products;
      } else {
        throw new Error('Failed to update products content');
      }
    } catch (error) {
      console.error('Error updating products:', error);
      throw error;
    }
  }

  async updateContact(contact: ContactInfo): Promise<void> {
    try {
      const success = await FileManager.updateContentFile('contact', contact);
      if (success && this.content) {
        this.content.contact = contact;
      } else {
        throw new Error('Failed to update contact content');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  }

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