import { supabase } from '@/integrations/supabase/client';

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

interface ProductCategory {
  id?: string;
  name: string;
  description: string;
  image_url?: string;
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
  id?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_description?: string;
  features_title?: string;
  features_description?: string;
  benefits_title: string;
  benefits_description: string;
  process_title?: string;
  process_description?: string;
}

interface ServicesPageBenefit {
  id?: string;
  icon: string;
  title: string;
  description: string;
  sort_order?: number;
}

interface ServicesPageFeature {
  id?: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  sort_order?: number;
}

interface ServicesPageProcess {
  id?: string;
  step_number: number;
  title: string;
  description: string;
  icon: string;
  sort_order?: number;
}

interface SiteContent {
  hero: HeroContent | null;
  homeServices: ServiceItem[]; // Services for home page
  services: ServiceItem[]; // Keep for compatibility
  products: ProductCategory[];
  clients: ClientItem[];
  about: AboutContent | null;
  contact: ContactInfo | null;
  servicesPage: {
    sections: ServicesPageSections | null;
    benefits: ServicesPageBenefit[];
    features: ServicesPageFeature[];
    process: ServicesPageProcess[];
  };
}

export class ContentStore {
  private static instance: ContentStore;
  private content: SiteContent = {
    hero: null,
    homeServices: [],
    services: [],
    products: [],
    clients: [],
    about: null,
    contact: null,
    servicesPage: {
      sections: null,
      benefits: [],
      features: [],
      process: []
    }
  };

  // Simple in-memory loaded flags to avoid redundant network requests
  private loadedFlags: Record<string, boolean> = {
    hero: false,
    homeServices: false,
    services: false,
    products: false,
    clients: false,
    about: false,
    contact: false,
    servicesPageSections: false,
    servicesPageBenefits: false,
    servicesPageFeatures: false,
    servicesPageProcess: false,
  };

  private constructor() {
    // Load cached data from localStorage on initialization
    // this.loadCachedData();
  }

  static getInstance(): ContentStore {
    if (!ContentStore.instance) {
      ContentStore.instance = new ContentStore();
    }
    return ContentStore.instance;
  }

  // Load cached data from localStorage
  // private loadCachedData() {
  //   try {
  //     const cached = localStorage.getItem('contentStore');
  //     if (cached) {
  //       const parsed = JSON.parse(cached);
  //       this.content = { ...this.content, ...parsed };
        
  //       // Mark cached sections as loaded
  //       Object.keys(parsed).forEach(key => {
  //         if (this.loadedFlags.hasOwnProperty(key)) {
  //           this.loadedFlags[key] = true;
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     console.warn('Failed to load cached content:', error);
  //   }
  // }

  // Cache data to localStorage
  // private cacheData(key: string, data: any) {
  //   try {
  //     const cached = localStorage.getItem('contentStore') || '{}';
  //     const parsed = JSON.parse(cached);
  //     parsed[key] = data;
  //     localStorage.setItem('contentStore', JSON.stringify(parsed));
  //   } catch (error) {
  //     console.warn('Failed to cache content:', error);
  //   }
  // }

  async loadContent(): Promise<SiteContent> {
    try {
      // Load everything, but skip sections already loaded
      await Promise.all([
        this.loadHero(),
        this.loadHomeServices(),
        this.loadServices(),
        this.loadProducts(),
        this.loadClients(),
        this.loadAbout(),
        this.loadContact(),
        this.loadServicesPage(),
      ]);
      return this.content;
    } catch (error) {
      console.error('Error loading content from Supabase:', error);
      return this.content;
    }
  }

  getContent(): SiteContent {
    return this.content;
  }

  // Reset loaded flags to force reload data
  resetLoadedFlags(): void {
    Object.keys(this.loadedFlags).forEach(key => {
      this.loadedFlags[key] = false;
    });
  }

  // Granular loaders (cached per session)
  async loadHero(): Promise<void> {
    if (this.loadedFlags.hero) return;
    try {
      const { data } = await supabase
        .from('hero_content')
        .select('*')
        .single();
      this.content.hero = data || null;
      this.loadedFlags.hero = true;
      // this.cacheData('hero', data || null);
    } catch (error) {
      console.warn('Failed to load hero content:', error);
    }
  }

  async loadHomeServices(): Promise<void> {
    if (this.loadedFlags.homeServices) return;
    try {
      const { data } = await supabase
        .from('home_services')
        .select('*')
        .order('sort_order');
      this.content.homeServices = data || [];
      this.loadedFlags.homeServices = true;
    } catch (error) {
      console.warn('Failed to load home services:', error);
    }
  }

  async loadServices(): Promise<void> {
    if (this.loadedFlags.services) return;
    try {
      const { data } = await supabase
        .from('services')
        .select('*')
        .order('sort_order');
      this.content.services = data || [];
      this.loadedFlags.services = true;
      // this.cacheData('services', data || []);
    } catch (error) {
      console.warn('Failed to load services:', error);
    }
  }

  async loadProducts(): Promise<void> {
    if (this.loadedFlags.products) return;
    try {
      const { data } = await supabase
        .from('product_categories')
        .select('*')
        .order('sort_order');
      this.content.products = data || [];
      this.loadedFlags.products = true;
      // this.cacheData('products', data || []);
    } catch (error) {
      console.warn('Failed to load products:', error);
    }
  }

  async loadClients(): Promise<void> {
    if (this.loadedFlags.clients) return;
    try {
      const { data } = await supabase
        .from('clients')
        .select('*')
        .order('sort_order');
      this.content.clients = data || [];
      this.loadedFlags.clients = true;
      // this.cacheData('clients', data || []);
    } catch (error) {
      console.warn('Failed to load clients:', error);
    }
  }

  async loadAbout(): Promise<void> {
    if (this.loadedFlags.about) return;
    try {
      const { data } = await supabase
        .from('about_content')
        .select('*')
        .maybeSingle();
      this.content.about = data || null;
      this.loadedFlags.about = true;
      // this.cacheData('about', data || null);
    } catch (error) {
      console.warn('Failed to load about content:', error);
    }
  }

  async loadContact(force: boolean = false): Promise<void> {
    if (this.loadedFlags.contact && !force) return;
    try {
      const { data } = await supabase
        .from('contact_info')
        .select('*')
        .maybeSingle();
      this.content.contact = data || null;
      this.loadedFlags.contact = true;
      // this.cacheData('contact', data || null);
    } catch (error) {
      console.warn('Failed to load contact info:', error);
    }
  }

  async loadServicesPage(): Promise<void> {
    await Promise.all([
      (async () => {
        if (this.loadedFlags.servicesPageSections) return;
        const { data } = await supabase
          .from('services_page_sections')
          .select('*')
          .maybeSingle();
        this.content.servicesPage.sections = data || null;
        this.loadedFlags.servicesPageSections = true;
      })(),
      (async () => {
        if (this.loadedFlags.servicesPageBenefits) return;
        const { data } = await supabase
          .from('services_page_benefits')
          .select('*')
          .order('sort_order');
        this.content.servicesPage.benefits = data || [];
        this.loadedFlags.servicesPageBenefits = true;
      })(),
      (async () => {
        if (this.loadedFlags.servicesPageFeatures) return;
        const { data } = await supabase
          .from('services_page_features')
          .select('*')
          .order('sort_order');
        this.content.servicesPage.features = data || [];
        this.loadedFlags.servicesPageFeatures = true;
      })(),
      (async () => {
        if (this.loadedFlags.servicesPageProcess) return;
        const { data } = await supabase
          .from('services_page_process')
          .select('*')
          .order('sort_order');
        this.content.servicesPage.process = data || [];
        this.loadedFlags.servicesPageProcess = true;
      })(),
    ]);
  }

  async updateHero(hero: Omit<HeroContent, 'id'>): Promise<void> {
    try {
      const { data } = await supabase
        .from('hero_content')
        .upsert({
          id: this.content.hero?.id,
          ...hero
        })
        .select()
        .single();

      if (data) {
        this.content.hero = data;
      }
    } catch (error) {
      console.error('Error updating hero content:', error);
      throw error;
    }
  }

  async updateHomeServices(services: ServiceItem[]): Promise<void> {
    try {
      // Delete all existing home services
      await supabase.from('home_services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Insert new home services
      const { data } = await supabase
        .from('home_services')
        .insert(services.map((service, index) => ({
          ...service,
          sort_order: index
        })))
        .select();

      if (data) {
        this.content.homeServices = data;
      }
    } catch (error) {
      console.error('Error updating home services:', error);
      throw error;
    }
  }

  async updateServices(services: ServiceItem[]): Promise<void> {
    try {
      // Delete all existing services
      await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Insert new services
      const { data } = await supabase
        .from('services')
        .insert(services.map((service, index) => ({
          ...service,
          sort_order: index
        })))
        .select();

      if (data) {
        this.content.services = data;
      }
    } catch (error) {
      console.error('Error updating services:', error);
      throw error;
    }
  }

  async updateProducts(products: ProductCategory[]): Promise<void> {
    try {
      // Delete all existing product categories
      await supabase.from('product_categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Insert new product categories
      const { data } = await supabase
        .from('product_categories')
        .insert(products.map((product, index) => ({
          ...product,
          sort_order: index
        })))
        .select();

      if (data) {
        this.content.products = data;
      }
    } catch (error) {
      console.error('Error updating product categories:', error);
      throw error;
    }
  }

  async updateClients(clients: ClientItem[]): Promise<void> {
    try {
      // Delete all existing clients
      await supabase.from('clients').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Insert new clients
      const { data } = await supabase
        .from('clients')
        .insert(clients.map((client, index) => ({
          ...client,
          sort_order: index
        })))
        .select();

      if (data) {
        this.content.clients = data;
      }
    } catch (error) {
      console.error('Error updating clients:', error);
      throw error;
    }
  }

  async updateAbout(about: Omit<AboutContent, 'id'>): Promise<void> {
    try {
      const { data } = await supabase
        .from('about_content')
        .upsert({
          id: this.content.about?.id,
          ...about
        })
        .select()
        .single();

      if (data) {
        this.content.about = data;
      }
    } catch (error) {
      console.error('Error updating about content:', error);
      throw error;
    }
  }

  async updateContact(contact: Omit<ContactInfo, 'id'>): Promise<void> {
    try {
      const { data } = await supabase
        .from('contact_info')
        .upsert({
          id: this.content.contact?.id,
          ...contact
        })
        .select()
        .single();

      if (data) {
        this.content.contact = data;
      }
    } catch (error) {
      console.error('Error updating contact info:', error);
      throw error;
    }
  }

  async updateServicesPageSections(sections: Omit<ServicesPageSections, 'id'>): Promise<void> {
    try {
      const { data } = await supabase
        .from('services_page_sections')
        .upsert({
          id: this.content.servicesPage.sections?.id,
          ...sections
        })
        .select()
        .single();

      if (data) {
        this.content.servicesPage.sections = data;
      }
    } catch (error) {
      console.error('Error updating services page sections:', error);
      throw error;
    }
  }

  async updateServicesPageBenefits(benefits: ServicesPageBenefit[]): Promise<void> {
    try {
      // Delete all existing benefits
      await supabase.from('services_page_benefits').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Insert new benefits
      const { data } = await supabase
        .from('services_page_benefits')
        .insert(benefits.map((benefit, index) => ({
          ...benefit,
          sort_order: index
        })))
        .select();

      if (data) {
        this.content.servicesPage.benefits = data;
      }
    } catch (error) {
      console.error('Error updating services page benefits:', error);
      throw error;
    }
  }

  async updateServicesPageFeatures(features: ServicesPageFeature[]): Promise<void> {
    try {
      // Delete all existing features
      await supabase.from('services_page_features').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Insert new features
      const { data } = await supabase
        .from('services_page_features')
        .insert(features.map((feature, index) => ({
          ...feature,
          sort_order: index
        })))
        .select();

      if (data) {
        this.content.servicesPage.features = data;
      }
    } catch (error) {
      console.error('Error updating services page features:', error);
      throw error;
    }
  }

  async updateServicesPageProcess(process: ServicesPageProcess[]): Promise<void> {
    try {
      // Delete all existing process
      await supabase.from('services_page_process').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Insert new process
      const { data } = await supabase
        .from('services_page_process')
        .insert(process.map((step, index) => ({
          ...step,
          sort_order: index
        })))
        .select();

      if (data) {
        this.content.servicesPage.process = data;
      }
    } catch (error) {
      console.error('Error updating services page process:', error);
      throw error;
    }
  }
}

export type { 
  SiteContent, 
  ServiceItem, 
  ProductCategory, 
  ClientItem, 
  ContactInfo, 
  HeroContent, 
  AboutContent,
  ServicesPageSections,
  ServicesPageBenefit,
  ServicesPageFeature,
  ServicesPageProcess
};