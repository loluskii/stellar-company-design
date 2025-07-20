-- Create tables for site content management

-- Hero content table
CREATE TABLE public.hero_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Product categories table
CREATE TABLE public.product_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- About content table
CREATE TABLE public.about_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  mission TEXT NOT NULL,
  vision TEXT NOT NULL,
  values TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Contact info table
CREATE TABLE public.contact_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT[] NOT NULL DEFAULT '{}',
  email TEXT[] NOT NULL DEFAULT '{}',
  address TEXT[] NOT NULL DEFAULT '{}',
  business_hours TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (make content publicly readable since this is a public website)
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (website content should be publicly viewable)
CREATE POLICY "Hero content is publicly readable" 
ON public.hero_content 
FOR SELECT 
USING (true);

CREATE POLICY "Services are publicly readable" 
ON public.services 
FOR SELECT 
USING (true);

CREATE POLICY "Product categories are publicly readable" 
ON public.product_categories 
FOR SELECT 
USING (true);

CREATE POLICY "About content is publicly readable" 
ON public.about_content 
FOR SELECT 
USING (true);

CREATE POLICY "Contact info is publicly readable" 
ON public.contact_info 
FOR SELECT 
USING (true);

-- Admin users can manage content (we'll implement auth later)
CREATE POLICY "Authenticated users can manage hero content" 
ON public.hero_content 
FOR ALL 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can manage services" 
ON public.services 
FOR ALL 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can manage product categories" 
ON public.product_categories 
FOR ALL 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can manage about content" 
ON public.about_content 
FOR ALL 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can manage contact info" 
ON public.contact_info 
FOR ALL 
TO authenticated 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_hero_content_updated_at
  BEFORE UPDATE ON public.hero_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_product_categories_updated_at
  BEFORE UPDATE ON public.product_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_about_content_updated_at
  BEFORE UPDATE ON public.about_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at
  BEFORE UPDATE ON public.contact_info
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content
INSERT INTO public.hero_content (title, subtitle, description, phone, email, location, image_url) VALUES (
  'WELLSTOCKED',
  'Premium Quality Products & Services',
  'Your trusted partner for all your needs. We provide top-quality products and exceptional services to help your business thrive.',
  '+234 XXX XXX XXXX',
  'info@wellstocked.ng',
  'Lagos, Nigeria',
  null
);

INSERT INTO public.services (title, description, icon, features, sort_order) VALUES 
('Supply Chain Management', 'End-to-end supply chain solutions tailored to your business needs', 'Truck', ARRAY['Inventory Management', 'Logistics Optimization', 'Vendor Relations', 'Cost Reduction'], 1),
('Quality Assurance', 'Rigorous quality control processes to ensure product excellence', 'CheckCircle', ARRAY['Product Testing', 'Quality Standards', 'Compliance Monitoring', 'Certification Support'], 2),
('Custom Solutions', 'Tailored products and services designed specifically for your requirements', 'Settings', ARRAY['Needs Assessment', 'Custom Development', 'Implementation Support', 'Ongoing Maintenance'], 3);

INSERT INTO public.product_categories (name, description, sort_order) VALUES 
('Industrial Equipment', 'High-quality machinery and equipment for industrial applications', 1),
('Office Supplies', 'Complete range of office essentials and business supplies', 2),
('Technology Solutions', 'Cutting-edge technology products and IT solutions', 3);

INSERT INTO public.about_content (title, description, mission, vision, values) VALUES (
  'About WELLSTOCKED',
  'WELLSTOCKED is a leading provider of premium quality products and services. With years of experience in the industry, we have built a reputation for excellence, reliability, and customer satisfaction.',
  'To provide our clients with the highest quality products and services while maintaining the highest standards of integrity and professionalism.',
  'To be the most trusted and respected provider of quality products and services in our industry.',
  ARRAY['Quality Excellence', 'Customer Focus', 'Integrity', 'Innovation', 'Reliability']
);

INSERT INTO public.contact_info (phone, email, address, business_hours) VALUES (
  ARRAY['+234 XXX XXX XXXX', '+234 YYY YYY YYYY'],
  ARRAY['info@wellstocked.ng', 'sales@wellstocked.ng'],
  ARRAY['123 Business District, Lagos, Nigeria', 'Regional Office: Abuja, Nigeria'],
  ARRAY['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 2:00 PM', 'Sunday: Closed']
);