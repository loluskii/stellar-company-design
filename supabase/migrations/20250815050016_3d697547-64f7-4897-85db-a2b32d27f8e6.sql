-- Create tables for additional page content

-- About page sections
CREATE TABLE public.about_page_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  hero_title TEXT NOT NULL,
  hero_subtitle TEXT NOT NULL,
  hero_description TEXT NOT NULL,
  story_title TEXT NOT NULL,
  story_content TEXT[] NOT NULL DEFAULT '{}',
  values_title TEXT NOT NULL,
  values_description TEXT NOT NULL,
  journey_title TEXT NOT NULL,
  journey_description TEXT NOT NULL
);

-- About page stats
CREATE TABLE public.about_page_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  icon TEXT NOT NULL,
  number TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- About page values
CREATE TABLE public.about_page_values (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- About page milestones
CREATE TABLE public.about_page_milestones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  highlight BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Services page sections
CREATE TABLE public.services_page_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  benefits_title TEXT NOT NULL,
  benefits_description TEXT NOT NULL
);

-- Services page benefits
CREATE TABLE public.services_page_benefits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Enable RLS on all tables
ALTER TABLE public.about_page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_page_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_page_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_page_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services_page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services_page_benefits ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "About page sections are publicly readable" ON public.about_page_sections FOR SELECT USING (true);
CREATE POLICY "About page stats are publicly readable" ON public.about_page_stats FOR SELECT USING (true);
CREATE POLICY "About page values are publicly readable" ON public.about_page_values FOR SELECT USING (true);
CREATE POLICY "About page milestones are publicly readable" ON public.about_page_milestones FOR SELECT USING (true);
CREATE POLICY "Services page sections are publicly readable" ON public.services_page_sections FOR SELECT USING (true);
CREATE POLICY "Services page benefits are publicly readable" ON public.services_page_benefits FOR SELECT USING (true);

-- Create policies for authenticated users to manage content
CREATE POLICY "Authenticated users can manage about page sections" ON public.about_page_sections FOR ALL USING (true);
CREATE POLICY "Authenticated users can manage about page stats" ON public.about_page_stats FOR ALL USING (true);
CREATE POLICY "Authenticated users can manage about page values" ON public.about_page_values FOR ALL USING (true);
CREATE POLICY "Authenticated users can manage about page milestones" ON public.about_page_milestones FOR ALL USING (true);
CREATE POLICY "Authenticated users can manage services page sections" ON public.services_page_sections FOR ALL USING (true);
CREATE POLICY "Authenticated users can manage services page benefits" ON public.services_page_benefits FOR ALL USING (true);

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_about_page_sections_updated_at
  BEFORE UPDATE ON public.about_page_sections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_about_page_stats_updated_at
  BEFORE UPDATE ON public.about_page_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_about_page_values_updated_at
  BEFORE UPDATE ON public.about_page_values
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_about_page_milestones_updated_at
  BEFORE UPDATE ON public.about_page_milestones
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_page_sections_updated_at
  BEFORE UPDATE ON public.services_page_sections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_page_benefits_updated_at
  BEFORE UPDATE ON public.services_page_benefits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();