-- Delete all existing products
DELETE FROM products;

-- Reset the sequence
ALTER SEQUENCE products_id_seq RESTART WITH 1;

-- Insert sample products
INSERT INTO products (name, price, image, description, category, stock) VALUES
('Premium Wireless Headphones', 149.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', 'High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.', 'Electronics', 25),

('Smart Watch Pro', 299.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop', 'Advanced smartwatch with fitness tracking, heart rate monitor, GPS, and 7-day battery life. Stay connected and healthy.', 'Electronics', 15),

('Leather Backpack', 89.99, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop', 'Stylish genuine leather backpack with laptop compartment, multiple pockets, and water-resistant coating. Perfect for work or travel.', 'Fashion', 30),

('Portable Bluetooth Speaker', 79.99, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop', 'Waterproof portable speaker with 360° sound, 12-hour battery, and deep bass. Take your music anywhere.', 'Electronics', 40),

('Designer Sunglasses', 129.99, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop', 'UV400 protection polarized sunglasses with premium frames. Stylish and protective for your eyes.', 'Fashion', 20),

('Fitness Yoga Mat', 34.99, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop', 'Non-slip eco-friendly yoga mat with carrying strap. 6mm thick for maximum comfort during workouts.', 'Sports', 50),

('Stainless Steel Water Bottle', 24.99, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop', 'Insulated water bottle keeps drinks cold for 24h or hot for 12h. BPA-free and leak-proof design.', 'Sports', 60),

('Wireless Gaming Mouse', 59.99, 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop', 'High-precision gaming mouse with RGB lighting, 16000 DPI, and programmable buttons. Perfect for gamers.', 'Electronics', 35),

('Organic Cotton T-Shirt', 29.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop', 'Comfortable 100% organic cotton t-shirt. Soft, breathable, and available in multiple colors.', 'Fashion', 100),

('Coffee Maker Pro', 199.99, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop', 'Programmable coffee maker with thermal carafe, brew strength control, and auto shut-off. Start your day right.', 'Home', 18),

('Running Shoes', 119.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop', 'Lightweight running shoes with cushioned sole and breathable mesh. Perfect for your daily runs.', 'Sports', 45),

('Desk Lamp LED', 44.99, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop', 'Adjustable LED desk lamp with touch control, multiple brightness levels, and USB charging port.', 'Home', 28);
