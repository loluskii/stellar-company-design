// JSON-based content management system
import hero from "@/data/hero.json"
import about from "@/data/about.json"
import clients from "@/data/clients.json"
import contact from "@/data/contact.json"
import services from "@/data/services.json"

interface ServiceItem {
  id?: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  sort_order?: number;
}

interface ClientItem {
  id?: string;
  name: string;
  logo_url?: string;
  sort_order?: number;
}

interface ContactInfo {
  id?: string;
  phone: string[];
  email: string[];
  address: string[];
  business_hours: string[];
}

interface HeroContent {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  location: string;
  image_url?: string;
}

interface AboutContent {
  id?: string;
  title: string;
  description: string;
  mission: string;
  vision: string;
  values: string[];
}

interface ServicesPageSections {
  benefits_title: string;
  benefits_description: string;
}

interface ServicesPageBenefit {
  id?: string;
  icon: string;
  title: string;
  description: string;
  sort_order?: number;
}

interface ServicesPageContent {
  sections: ServicesPageSections;
  benefits: ServicesPageBenefit[];
}

interface SiteContent {
  hero: HeroContent | null;
  services: ServiceItem[];
  clients: ClientItem[];
  contact: ContactInfo | null;
  about: AboutContent | null;
  servicesPage: ServicesPageContent;
}

export class ContentManager {
  private static instance: ContentManager;
  private content: SiteContent = {
    hero: null,
    services: [],
    clients: [],
    contact: null,
    about: null,
    servicesPage: {
      sections: {
        benefits_title: "",
        benefits_description: ""
      },
      benefits: []
    }
  };

  private constructor() {}

  static getInstance(): ContentManager {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager();
    }
    return ContentManager.instance;
  }

  async loadContent(): Promise<SiteContent> {
    try {
      await Promise.all([
        this.loadHero(),
        this.loadServices(),
        this.loadClients(),
        this.loadContact(),
        this.loadAbout(),
        this.loadServicesPage(),
      ]);
      return this.content;
    } catch (error) {
      console.error('Error loading content:', error);
      return this.content;
    }
  }

  getContent(): SiteContent {
    return this.content;
  }

  async loadHero(): Promise<void> {
    try {
      this.content.hero = hero;
    } catch (error) {
      console.warn('Failed to load hero content:', error);
    }
  }

  async loadServices(): Promise<void> {
    try {
      this.content.services = services;
    } catch (error) {
      console.warn('Failed to load services:', error);
    }
  }

  async loadClients(): Promise<void> {
    try {
      this.content.clients = clients;
    } catch (error) {
      console.warn('Failed to load clients:', error);
    }
  }

  async loadContact(): Promise<void> {
    try {
      this.content.contact = contact;
    } catch (error) {
      console.warn('Failed to load contact info:', error);
    }
  }

  async loadAbout(): Promise<void> {
    try {
      this.content.about = about;
    } catch (error) {
      console.warn('Failed to load about content:', error);
    }
  }

  async loadServicesPage(): Promise<void> {
    try {
      const response = await fetch('/src/data/servicesPage.json');
      const data = await response.json();
      this.content.servicesPage = data;
    } catch (error) {
      console.warn('Failed to load services page content:', error);
    }
  }
}

export type { 
  SiteContent, 
  ServiceItem, 
  ClientItem, 
  ContactInfo, 
  HeroContent,
  AboutContent,
  ServicesPageSections,
  ServicesPageBenefit
};