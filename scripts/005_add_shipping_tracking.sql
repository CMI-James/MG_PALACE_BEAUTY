-- Add shipping tracking functionality
-- Add tracking columns to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number VARCHAR(50);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_status VARCHAR(20) DEFAULT 'pending';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipped_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMP WITH TIME ZONE;

-- Create shipping_updates table for tracking history
CREATE TABLE IF NOT EXISTS shipping_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL,
  message TEXT,
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on shipping_updates
ALTER TABLE shipping_updates ENABLE ROW LEVEL SECURITY;

-- Create policies for shipping_updates
CREATE POLICY "Users can view their own shipping updates" ON shipping_updates
  FOR SELECT USING (
    order_id IN (
      SELECT id FROM orders WHERE user_id = auth.uid()
    )
  );

-- Fixed reference from user_profiles to profiles and role to is_admin
CREATE POLICY "Admins can manage all shipping updates" ON shipping_updates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Create function to update shipping status
CREATE OR REPLACE FUNCTION update_shipping_status(
  p_order_id UUID,
  p_status VARCHAR(20),
  p_message TEXT DEFAULT NULL,
  p_location VARCHAR(255) DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  -- Update order shipping status
  UPDATE orders 
  SET 
    shipping_status = p_status,
    shipped_at = CASE WHEN p_status = 'shipped' AND shipped_at IS NULL THEN NOW() ELSE shipped_at END,
    delivered_at = CASE WHEN p_status = 'delivered' THEN NOW() ELSE delivered_at END,
    updated_at = NOW()
  WHERE id = p_order_id;
  
  -- Insert shipping update record
  INSERT INTO shipping_updates (order_id, status, message, location)
  VALUES (p_order_id, p_status, p_message, p_location);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
