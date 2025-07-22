-- Update hero content with Wellstocked company information
UPDATE hero_content SET
  title = 'Wellstocked Nigeria Limited',
  subtitle = 'Your Trusted Partner in Office Equipment & Automation',
  description = 'Contractor, importer and authorized distributor of quality office equipment and automation in Nigeria with over 29 years of experience serving Oil & Gas, Banking, Telecommunications, and Public sectors.',
  phone = '01-2702549',
  email = 'info@wellstockednig.com',
  location = 'Lekki Phase I, Lagos',
  updated_at = now()
WHERE id IN (SELECT id FROM hero_content LIMIT 1);

-- Update about content with company information
UPDATE about_content SET
  title = 'About Wellstocked Nigeria Limited',
  description = 'Wellstocked is a contractor, importer and authorized distributor of quality office equipment and automation in Nigeria. Our suppliers include Sharp Corporation, Panasonic Corporation, HP, Katun EDC and Fargo. We sell, distribute and provide after-sales services through our constantly trained and competent engineers and sales force via our branches spread across the country.',
  mission = 'To provide quality office equipment and automation solutions with prompt response and minimal downtime, ensuring long product life through regular preventive maintenance and comprehensive after-sales service.',
  vision = 'To be the leading distributor of office equipment and automation solutions across Nigeria, serving every terrain and region with excellence and reliability.',
  values = ARRAY['Quality Assurance - Only authorized dealers with genuine products', 'Expert Service - 29+ years of experience with trained engineers', 'Comprehensive Coverage - Services available in any terrain across Nigeria', 'Client Focus - Serving Oil & Gas, Banking, Telecommunications and Public sectors', 'Preventive Maintenance - Ensuring long product life and minimal downtime'],
  updated_at = now()
WHERE id IN (SELECT id FROM about_content LIMIT 1);

-- Update services with Wellstocked's business offerings
DELETE FROM services;
INSERT INTO services (title, description, icon, features, sort_order) VALUES
('Office Equipment Sales & Distribution', 'Comprehensive sales and distribution of quality office equipment from authorized suppliers including Sharp, Panasonic, HP, and Fargo.', 'printer', ARRAY['Sharp Photocopiers', 'HP Printers & Computer Systems', 'Office Furniture', 'Networking Hardware'], 1),
('UPS & Power Solutions', 'Online/Industrial UPS systems, inverter batteries, and power management solutions for uninterrupted business operations.', 'battery-charging', ARRAY['Industrial UPS Systems', 'Inverter Batteries', 'Power Management', 'ATM Power Solutions'], 2),
('Air Conditioning Systems', 'Sales, installation and maintenance of air conditioning systems from trusted brands like Panasonic and Sharp.', 'airplay', ARRAY['Panasonic Air Conditioners', 'Sharp Cooling Systems', 'Installation Services', 'Maintenance Support'], 3),
('Interactive Technology Solutions', 'Advanced interactive touch screens, digital displays, video walls and intelligent automation systems.', 'monitor', ARRAY['Sharp Interactive Touch Screens', 'Video Wall Systems', 'Digital Displays', 'Interactive Automation'], 4),
('ID Card & Security Systems', 'Fargo ID card printing machines, POS systems, scanners and security hardware for business operations.', 'credit-card', ARRAY['Fargo ID Card Printers', 'POS Machine Systems', 'Industrial Scanners', 'Security Hardware'], 5),
('Maintenance & Support Services', 'Comprehensive after-sales service, preventive maintenance, and technical support with trained engineers across Nigeria.', 'wrench', ARRAY['Preventive Maintenance', '24/7 Technical Support', 'Trained Engineers', 'Nationwide Coverage'], 6);

-- Update contact information with Wellstocked branch details
DELETE FROM contact_info;
INSERT INTO contact_info (phone, email, address, business_hours) VALUES
(
  ARRAY['01-2702549', '01-4610412', '07027702217', '07027706037'],
  ARRAY['info@wellstockednig.com', 'sales@wellstockednig.com'],
  ARRAY[
    'HEAD OFFICE: Block 123, Plot 4, Adewale Kolawole Street, Off Remi Olowude Street, New Marwa Market, Lekki Phase I, Lagos',
    'IKEJA BRANCH: 4, Pepple Street, Beside Zenith Bank, Shop 37, Computer Village, Ikeja, Lagos. Tel: 01-7745209',
    'ABUJA BRANCH: Suite F18 Febson Mall, Herbert Macaulay Way, Zone 4, Wuse, Abuja. Tel: 09-5239915, 6721589',
    'PORT HARCOURT BRANCH: 6A, Ogunabali, Off Trans-Amadi Road, Garrison, Port Harcourt, River State. Tel: 08104920283',
    'WAREHOUSE: 71, Jebba Street, Ebute-Metta, Lagos | Oyadiran Street, Sabo-Yaba, Lagos'
  ],
  ARRAY['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 4:00 PM', 'Sunday: Closed', 'Emergency Support: Available 24/7']
);

-- Update product categories with Wellstocked's equipment categories
DELETE FROM product_categories;
INSERT INTO product_categories (name, description, sort_order) VALUES
('Photocopiers & Printers', 'Sharp photocopiers, HP printers, and comprehensive printing solutions with consumables and accessories.', 1),
('Computer Systems & Networking', 'HP and Dell computer systems, Cisco networking hardware, servers and IT infrastructure solutions.', 2),
('UPS & Power Solutions', 'Industrial UPS systems, inverter batteries, and power management equipment for business continuity.', 3),
('Air Conditioning Systems', 'Panasonic and Sharp air conditioning units for office and industrial cooling requirements.', 4),
('Interactive Display Technology', 'Sharp interactive touch screens, video walls, digital displays and intelligent automation systems.', 5),
('Office Equipment & Furniture', 'Complete office furniture solutions, scanners, shredders, and essential office automation equipment.', 6),
('Security & ID Systems', 'Fargo ID card printing systems, POS machines, note counting machines, and security hardware.', 7),
('Consumables & Accessories', 'ATM consumables, printer cartridges, toners, and maintenance supplies for all equipment types.', 8);