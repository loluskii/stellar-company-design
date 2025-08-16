-- Create home page services table (separate from full services page)
CREATE TABLE public.home_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sort_order INTEGER NOT NULL DEFAULT 0,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}'::text[]
);

-- Enable RLS
ALTER TABLE public.home_services ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Home services are publicly readable" 
ON public.home_services 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage home services" 
ON public.home_services 
FOR ALL 
USING (true);

-- Add more content sections for services page
CREATE TABLE public.services_page_features (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sort_order INTEGER NOT NULL DEFAULT 0,
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}'::text[]
);

-- Enable RLS
ALTER TABLE public.services_page_features ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Services page features are publicly readable" 
ON public.services_page_features 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage services page features" 
ON public.services_page_features 
FOR ALL 
USING (true);

-- Add process/methodology section
CREATE TABLE public.services_page_process (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sort_order INTEGER NOT NULL DEFAULT 0,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE public.services_page_process ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Services page process are publicly readable" 
ON public.services_page_process 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage services page process" 
ON public.services_page_process 
FOR ALL 
USING (true);

-- Update services page sections to include more content
ALTER TABLE public.services_page_sections 
ADD COLUMN hero_title TEXT,
ADD COLUMN hero_subtitle TEXT,
ADD COLUMN hero_description TEXT,
ADD COLUMN features_title TEXT,
ADD COLUMN features_description TEXT,
ADD COLUMN process_title TEXT,
ADD COLUMN process_description TEXT;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_home_services_updated_at
BEFORE UPDATE ON public.home_services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_page_features_updated_at
BEFORE UPDATE ON public.services_page_features
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_page_process_updated_at
BEFORE UPDATE ON public.services_page_process
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();