-- Add missing columns to products table if they don't exist
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS category VARCHAR(100),
ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 0;

-- Update existing products to have default stock if null
UPDATE products SET stock = 10 WHERE stock IS NULL OR stock = 0;
