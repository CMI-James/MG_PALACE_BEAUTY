-- Create promotional banners table
CREATE TABLE IF NOT EXISTS promotional_banners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  discount_percentage INTEGER,
  discount_code VARCHAR(50),
  background_color VARCHAR(7) DEFAULT '#4CAF50',
  text_color VARCHAR(7) DEFAULT '#FFFFFF',
  link_url VARCHAR(500),
  link_text VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  priority INTEGER DEFAULT 0, -- Higher priority shows first
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on promotional_banners
ALTER TABLE promotional_banners ENABLE ROW LEVEL SECURITY;

-- Create policies for promotional_banners
CREATE POLICY "Everyone can view active banners" ON promotional_banners
  FOR SELECT USING (
    is_active = true 
    AND (start_date IS NULL OR start_date <= NOW())
    AND (end_date IS NULL OR end_date >= NOW())
  );

-- Fixed reference from user_profiles to profiles and role to is_admin
CREATE POLICY "Admins can manage all banners" ON promotional_banners
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Insert some sample banners
INSERT INTO promotional_banners (title, message, discount_percentage, discount_code, link_url, link_text, priority) VALUES
('Free Shipping Weekend!', 'Get free shipping on all orders this weekend only', NULL, 'FREESHIP', '/products', 'Shop Now', 1),
('New Customer Special', 'Save 15% on your first order with code WELCOME15', 15, 'WELCOME15', '/products', 'Start Shopping', 2),
('Professional Training Sale', 'Limited time: 20% off all training courses', 20, 'TRAIN20', '/services/training', 'Learn More', 0);
