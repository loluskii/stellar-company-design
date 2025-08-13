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

interface SiteContent {
  hero: HeroContent | null;
  services: ServiceItem[];
  products: ProductCategory[];
  clients: ClientItem[];
  about: AboutContent | null;
  contact: ContactInfo | null;
}

export class ContentStore {
  private static instance: ContentStore;
  private content: SiteContent = {
    hero: null,
    services: [],
    products: [],
    clients: [],
    about: null,
    contact: null
  };

  private constructor() {
    // No need to load content in constructor since we'll load it asynchronously
  }

  static getInstance(): ContentStore {
    if (!ContentStore.instance) {
      ContentStore.instance = new ContentStore();
    }
    return ContentStore.instance;
  }

  async loadContent(): Promise<SiteContent> {
    try {
      // Load hero content
      const { data: heroData } = await supabase
        .from('hero_content')
        .select('*')
        .single();

      // Load services
      const { data: servicesData } = await supabase
        .from('services')
        .select('*')
        .order('sort_order');

      // Load product categories
      const { data: productsData } = await supabase
        .from('product_categories')
        .select('*')
        .order('sort_order');

      // Load clients
      const { data: clientsData } = await supabase
        .from('clients')
        .select('*')
        .order('sort_order');

      // Load about content
      const { data: aboutData } = await supabase
        .from('about_content')
        .select('*')
        .maybeSingle();

      // Load contact info
      const { data: contactData } = await supabase
        .from('contact_info')
        .select('*')
        .maybeSingle();

      this.content = {
        hero: heroData || null,
        services: servicesData || [],
        products: productsData || [],
        clients: clientsData || [],
        about: aboutData || null,
        contact: contactData || null
      };

      return this.content;
    } catch (error) {
      console.error('Error loading content from Supabase:', error);
      return this.content;
    }
  }

  getContent(): SiteContent {
    return this.content;
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
}

export type { SiteContent, ServiceItem, ProductCategory, ClientItem, ContactInfo, HeroContent, AboutContent };