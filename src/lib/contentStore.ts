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

interface AboutPageSections {
  id?: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  story_title: string;
  story_content: string[];
  values_title: string;
  values_description: string;
  journey_title: string;
  journey_description: string;
}

interface AboutPageStat {
  id?: string;
  icon: string;
  number: string;
  label: string;
  sort_order?: number;
}

interface AboutPageValue {
  id?: string;
  icon: string;
  title: string;
  description: string;
  sort_order?: number;
}

interface AboutPageMilestone {
  id?: string;
  year: string;
  title: string;
  description: string;
  highlight: boolean;
  sort_order?: number;
}

interface ServicesPageSections {
  id?: string;
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

interface SiteContent {
  hero: HeroContent | null;
  services: ServiceItem[];
  products: ProductCategory[];
  clients: ClientItem[];
  about: AboutContent | null;
  contact: ContactInfo | null;
  aboutPage: {
    sections: AboutPageSections | null;
    stats: AboutPageStat[];
    values: AboutPageValue[];
    milestones: AboutPageMilestone[];
  };
  servicesPage: {
    sections: ServicesPageSections | null;
    benefits: ServicesPageBenefit[];
  };
}

export class ContentStore {
  private static instance: ContentStore;
  private content: SiteContent = {
    hero: null,
    services: [],
    products: [],
    clients: [],
    about: null,
    contact: null,
    aboutPage: {
      sections: null,
      stats: [],
      values: [],
      milestones: []
    },
    servicesPage: {
      sections: null,
      benefits: []
    }
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

      // Load about page sections
      const { data: aboutPageSectionsData } = await supabase
        .from('about_page_sections')
        .select('*')
        .maybeSingle();

      // Load about page stats
      const { data: aboutPageStatsData } = await supabase
        .from('about_page_stats')
        .select('*')
        .order('sort_order');

      // Load about page values
      const { data: aboutPageValuesData } = await supabase
        .from('about_page_values')
        .select('*')
        .order('sort_order');

      // Load about page milestones
      const { data: aboutPageMilestonesData } = await supabase
        .from('about_page_milestones')
        .select('*')
        .order('sort_order');

      // Load services page sections
      const { data: servicesPageSectionsData } = await supabase
        .from('services_page_sections')
        .select('*')
        .maybeSingle();

      // Load services page benefits
      const { data: servicesPageBenefitsData } = await supabase
        .from('services_page_benefits')
        .select('*')
        .order('sort_order');

      this.content = {
        hero: heroData || null,
        services: servicesData || [],
        products: productsData || [],
        clients: clientsData || [],
        about: aboutData || null,
        contact: contactData || null,
        aboutPage: {
          sections: aboutPageSectionsData || null,
          stats: aboutPageStatsData || [],
          values: aboutPageValuesData || [],
          milestones: aboutPageMilestonesData || []
        },
        servicesPage: {
          sections: servicesPageSectionsData || null,
          benefits: servicesPageBenefitsData || []
        }
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

  async updateAboutPageSections(sections: Omit<AboutPageSections, 'id'>): Promise<void> {
    try {
      const { data } = await supabase
        .from('about_page_sections')
        .upsert({
          id: this.content.aboutPage.sections?.id,
          ...sections
        })
        .select()
        .single();

      if (data) {
        this.content.aboutPage.sections = data;
      }
    } catch (error) {
      console.error('Error updating about page sections:', error);
      throw error;
    }
  }

  async updateAboutPageStats(stats: AboutPageStat[]): Promise<void> {
    try {
      // Delete all existing stats
      await supabase.from('about_page_stats').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Insert new stats
      const { data } = await supabase
        .from('about_page_stats')
        .insert(stats.map((stat, index) => ({
          ...stat,
          sort_order: index
        })))
        .select();

      if (data) {
        this.content.aboutPage.stats = data;
      }
    } catch (error) {
      console.error('Error updating about page stats:', error);
      throw error;
    }
  }

  async updateAboutPageValues(values: AboutPageValue[]): Promise<void> {
    try {
      // Delete all existing values
      await supabase.from('about_page_values').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Insert new values
      const { data } = await supabase
        .from('about_page_values')
        .insert(values.map((value, index) => ({
          ...value,
          sort_order: index
        })))
        .select();

      if (data) {
        this.content.aboutPage.values = data;
      }
    } catch (error) {
      console.error('Error updating about page values:', error);
      throw error;
    }
  }

  async updateAboutPageMilestones(milestones: AboutPageMilestone[]): Promise<void> {
    try {
      // Delete all existing milestones
      await supabase.from('about_page_milestones').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Insert new milestones
      const { data } = await supabase
        .from('about_page_milestones')
        .insert(milestones.map((milestone, index) => ({
          ...milestone,
          sort_order: index
        })))
        .select();

      if (data) {
        this.content.aboutPage.milestones = data;
      }
    } catch (error) {
      console.error('Error updating about page milestones:', error);
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
}

export type { 
  SiteContent, 
  ServiceItem, 
  ProductCategory, 
  ClientItem, 
  ContactInfo, 
  HeroContent, 
  AboutContent,
  AboutPageSections,
  AboutPageStat,
  AboutPageValue,
  AboutPageMilestone,
  ServicesPageSections,
  ServicesPageBenefit
};