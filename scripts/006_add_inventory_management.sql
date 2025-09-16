-- Add inventory management functionality

-- Create function to reduce product inventory when order is placed
CREATE OR REPLACE FUNCTION reduce_product_inventory()
RETURNS TRIGGER AS $$
BEGIN
  -- Only reduce inventory when order status changes to 'confirmed' or 'paid'
  IF NEW.status IN ('confirmed', 'paid') AND (OLD.status IS NULL OR OLD.status NOT IN ('confirmed', 'paid')) THEN
    -- Reduce inventory for each product in the order
    UPDATE products 
    SET 
      quantity = quantity - order_items.quantity,
      updated_at = NOW()
    FROM order_items 
    WHERE products.id = order_items.product_id 
    AND order_items.order_id = NEW.id;
    
    -- Check for products that went out of stock
    UPDATE products 
    SET is_active = false
    WHERE quantity <= 0 AND is_active = true;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically reduce inventory
DROP TRIGGER IF EXISTS trigger_reduce_inventory ON orders;
CREATE TRIGGER trigger_reduce_inventory
  AFTER UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION reduce_product_inventory();

-- Create function to restore inventory when order is cancelled
CREATE OR REPLACE FUNCTION restore_product_inventory()
RETURNS TRIGGER AS $$
BEGIN
  -- Only restore inventory when order status changes to 'cancelled' or 'refunded'
  IF NEW.status IN ('cancelled', 'refunded') AND OLD.status NOT IN ('cancelled', 'refunded') THEN
    -- Restore inventory for each product in the order
    UPDATE products 
    SET 
      quantity = quantity + order_items.quantity,
      is_active = true,
      updated_at = NOW()
    FROM order_items 
    WHERE products.id = order_items.product_id 
    AND order_items.order_id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create inventory_logs table for tracking stock changes
CREATE TABLE IF NOT EXISTS inventory_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  change_type VARCHAR(20) NOT NULL, -- 'sale', 'restock', 'adjustment', 'return'
  quantity_change INTEGER NOT NULL, -- positive for increase, negative for decrease
  previous_quantity INTEGER NOT NULL,
  new_quantity INTEGER NOT NULL,
  reason TEXT,
  -- Fixed reference from user_profiles to profiles
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on inventory_logs
ALTER TABLE inventory_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for inventory_logs
-- Fixed reference from user_profiles to profiles and role to is_admin
CREATE POLICY "Admins can view all inventory logs" ON inventory_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Admins can manage inventory logs" ON inventory_logs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Create function to log inventory changes
CREATE OR REPLACE FUNCTION log_inventory_change(
  p_product_id UUID,
  p_change_type VARCHAR(20),
  p_quantity_change INTEGER,
  p_order_id UUID DEFAULT NULL,
  p_reason TEXT DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
  v_previous_quantity INTEGER;
  v_new_quantity INTEGER;
BEGIN
  -- Get current quantity
  SELECT quantity INTO v_previous_quantity FROM products WHERE id = p_product_id;
  v_new_quantity := v_previous_quantity + p_quantity_change;
  
  -- Insert log entry
  INSERT INTO inventory_logs (
    product_id, 
    order_id, 
    change_type, 
    quantity_change, 
    previous_quantity, 
    new_quantity, 
    reason, 
    created_by
  ) VALUES (
    p_product_id,
    p_order_id,
    p_change_type,
    p_quantity_change,
    v_previous_quantity,
    v_new_quantity,
    p_reason,
    auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to manually adjust inventory
CREATE OR REPLACE FUNCTION adjust_product_inventory(
  p_product_id UUID,
  p_new_quantity INTEGER,
  p_reason TEXT DEFAULT 'Manual adjustment'
)
RETURNS VOID AS $$
DECLARE
  v_current_quantity INTEGER;
  v_quantity_change INTEGER;
BEGIN
  -- Get current quantity
  SELECT quantity INTO v_current_quantity FROM products WHERE id = p_product_id;
  v_quantity_change := p_new_quantity - v_current_quantity;
  
  -- Update product quantity
  UPDATE products 
  SET 
    quantity = p_new_quantity,
    is_active = CASE WHEN p_new_quantity > 0 THEN true ELSE is_active END,
    updated_at = NOW()
  WHERE id = p_product_id;
  
  -- Log the change
  PERFORM log_inventory_change(
    p_product_id,
    'adjustment',
    v_quantity_change,
    NULL,
    p_reason
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
