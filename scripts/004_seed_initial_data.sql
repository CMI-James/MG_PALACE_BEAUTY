-- Seed initial data for MG Beauty Palace

-- Insert categories
INSERT INTO categories (name, description, slug, image_url) VALUES
('Microblading Tools', 'Professional microblading tools and equipment for eyebrow enhancement', 'microblading-tools', '/images/categories/microblading.jpg'),
('Lash Extensions', 'Premium eyelash extensions and application tools', 'lash-extensions', '/images/categories/lash-extensions.jpg'),
('Facial Treatments', 'Professional facial treatment products and equipment', 'facial-treatments', '/images/categories/facial-treatments.jpg'),
('Beauty Accessories', 'Essential beauty accessories and tools', 'beauty-accessories', '/images/categories/beauty-accessories.jpg'),
('Training & Courses', 'Professional beauty training and certification courses', 'training-courses', '/images/categories/training.jpg');

-- Insert sample products
INSERT INTO products (name, description, short_description, price, compare_price, sku, category_id, images, tags, is_featured, slug) VALUES
(
  'Professional Microblading Pen Kit',
  'Complete microblading pen kit with adjustable needle depth, ergonomic design, and precision control for professional eyebrow enhancement procedures.',
  'Professional microblading pen with adjustable needle depth',
  45000.00,
  55000.00,
  'MBP-001',
  (SELECT id FROM categories WHERE slug = 'microblading-tools'),
  '["https://placeholder.svg?height=400&width=400&query=microblading pen kit", "https://placeholder.svg?height=400&width=400&query=microblading pen close up"]',
  ARRAY['microblading', 'professional', 'eyebrows', 'tools'],
  true,
  'professional-microblading-pen-kit'
),
(
  'Premium Mink Lash Extensions Set',
  'Luxurious mink lash extensions in various lengths and curls. Lightweight, natural-looking, and long-lasting for professional lash artists.',
  'Premium mink lash extensions in multiple lengths',
  25000.00,
  30000.00,
  'MLE-001',
  (SELECT id FROM categories WHERE slug = 'lash-extensions'),
  '["https://placeholder.svg?height=400&width=400&query=mink lash extensions", "https://placeholder.svg?height=400&width=400&query=lash extension varieties"]',
  ARRAY['lashes', 'mink', 'extensions', 'premium'],
  true,
  'premium-mink-lash-extensions-set'
),
(
  'Hydrating Facial Serum',
  'Advanced hydrating facial serum with hyaluronic acid and vitamin C. Perfect for professional facial treatments and daily skincare routines.',
  'Hydrating serum with hyaluronic acid and vitamin C',
  15000.00,
  18000.00,
  'HFS-001',
  (SELECT id FROM categories WHERE slug = 'facial-treatments'),
  '["https://placeholder.svg?height=400&width=400&query=facial serum bottle", "https://placeholder.svg?height=400&width=400&query=skincare serum application"]',
  ARRAY['skincare', 'serum', 'hydrating', 'facial'],
  true,
  'hydrating-facial-serum'
),
(
  'Professional Makeup Brush Set',
  'Complete set of 12 professional makeup brushes made with synthetic bristles. Perfect for makeup artists and beauty enthusiasts.',
  'Set of 12 professional makeup brushes',
  20000.00,
  25000.00,
  'MBS-001',
  (SELECT id FROM categories WHERE slug = 'beauty-accessories'),
  '["https://placeholder.svg?height=400&width=400&query=makeup brush set", "https://placeholder.svg?height=400&width=400&query=professional makeup brushes"]',
  ARRAY['makeup', 'brushes', 'professional', 'tools'],
  true,
  'professional-makeup-brush-set'
);

-- Insert sample services
INSERT INTO services (name, description, short_description, price, duration, category_id, images, slug) VALUES
(
  'Microblading Eyebrow Enhancement',
  'Professional microblading service to create natural-looking, fuller eyebrows. Includes consultation, design, and touch-up session.',
  'Professional microblading for natural-looking eyebrows',
  80000.00,
  180,
  (SELECT id FROM categories WHERE slug = 'microblading-tools'),
  '["https://placeholder.svg?height=400&width=400&query=microblading procedure", "https://placeholder.svg?height=400&width=400&query=eyebrow enhancement before after"]',
  'microblading-eyebrow-enhancement'
),
(
  'Classic Lash Extension Application',
  'Professional classic lash extension application for natural-looking length and volume. Includes aftercare instructions.',
  'Classic lash extensions for natural length and volume',
  35000.00,
  120,
  (SELECT id FROM categories WHERE slug = 'lash-extensions'),
  '["https://placeholder.svg?height=400&width=400&query=lash extension application", "https://placeholder.svg?height=400&width=400&query=classic lash extensions result"]',
  'classic-lash-extension-application'
),
(
  'Deep Cleansing Facial Treatment',
  'Comprehensive facial treatment including deep cleansing, exfoliation, extraction, and hydrating mask for glowing skin.',
  'Deep cleansing facial with extraction and hydrating mask',
  25000.00,
  90,
  (SELECT id FROM categories WHERE slug = 'facial-treatments'),
  '["https://placeholder.svg?height=400&width=400&query=facial treatment session", "https://placeholder.svg?height=400&width=400&query=facial cleansing procedure"]',
  'deep-cleansing-facial-treatment'
),
(
  'Microblading Training Course',
  'Comprehensive 3-day microblading training course including theory, practice, and certification. All materials included.',
  '3-day professional microblading training with certification',
  150000.00,
  1440,
  (SELECT id FROM categories WHERE slug = 'training-courses'),
  '["https://placeholder.svg?height=400&width=400&query=microblading training class", "https://placeholder.svg?height=400&width=400&query=beauty training certification"]',
  'microblading-training-course'
);
