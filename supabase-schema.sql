-- ====================================================================
-- SUPABASE POSTGRESQL SCHEMA & INITIAL DATA SETUP
-- Project: SewaMobilKendari.com
-- Instruction: Copy and paste this script directly into Supabase SQL Editor
-- ====================================================================

-- 1. Enable Required Extensions & Create Custom ENUM Types
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$ BEGIN
    CREATE TYPE car_status AS ENUM ('available', 'rented', 'maintenance');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create Table: users (Admin authentication)
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Table: categories (Car Categories)
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE
);

-- 4. Create Table: cars (Armada Mobil)
CREATE TABLE IF NOT EXISTS cars (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  category_id INT REFERENCES categories(id) ON DELETE SET NULL,
  transmission VARCHAR(50) NOT NULL DEFAULT 'Manual',
  fuel_type VARCHAR(50) NOT NULL DEFAULT 'Bensin',
  capacity INT NOT NULL DEFAULT 5,
  price_per_day NUMERIC(12,2) NOT NULL,
  image_url TEXT NOT NULL,
  status car_status DEFAULT 'available',
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create Table: car_features (Fitur Mobil)
CREATE TABLE IF NOT EXISTS car_features (
  id SERIAL PRIMARY KEY,
  car_id VARCHAR(255) REFERENCES cars(id) ON DELETE CASCADE,
  feature_name VARCHAR(255) NOT NULL
);

-- 6. Create Table: bookings (Pemesanan Pelanggan)
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_code VARCHAR(100) UNIQUE NOT NULL,
  car_id VARCHAR(255) REFERENCES cars(id) ON DELETE CASCADE,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  customer_email VARCHAR(255),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  total_days INT DEFAULT 1,
  total_price NUMERIC(12,2) NOT NULL,
  status booking_status DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Create Table: destinations (Kelola Wisata)
CREATE TABLE IF NOT EXISTS destinations (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255) NOT NULL,
  recommended_car VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Create Table: site_settings (Pengaturan Website & Kontak)
CREATE TABLE IF NOT EXISTS site_settings (
  key VARCHAR(255) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================================
-- SEED INITIAL DATA
-- ====================================================================

-- Seed Default Admin User (Password: admin123)
INSERT INTO users (email, password_hash, name, role)
VALUES (
  'admin@sewamobilkendari.com',
  '$2a$12$ZkW1W04d3jTq0G43hvhvO.fS06lM2Q7K30m3/mE/bS8g7Q.Q4Xw4.',
  'Admin SewaMobilKendari',
  'admin'
)
ON CONFLICT (email) DO NOTHING;

-- Seed Categories
INSERT INTO categories (id, name, slug) VALUES
  (1, 'MPV Family', 'mpv-family'),
  (2, 'SUV & Crossover', 'suv-crossover'),
  (3, 'City Car', 'city-car'),
  (4, 'Luxury & VIP', 'luxury-vip'),
  (5, 'Van & Microbus', 'van-microbus')
ON CONFLICT (id) DO NOTHING;

-- Seed Cars Catalog
INSERT INTO cars (id, name, slug, category_id, transmission, fuel_type, capacity, price_per_day, image_url, status, is_featured) VALUES
  ('innova-reborn', 'Toyota Innova Reborn', 'innova-reborn', 1, 'Automatic', 'Diesel', 7, 600000.00, '/cars/innova-reborn.jpg', 'available', true),
  ('avanza-facelift', 'Toyota Avanza Facelift', 'avanza-facelift', 1, 'Manual', 'Bensin', 7, 450000.00, '/cars/avanza.jpg', 'available', true),
  ('fortuner-vrz', 'Toyota Fortuner VRZ', 'fortuner-vrz', 2, 'Automatic', 'Diesel', 7, 1200000.00, '/cars/fortuner.jpg', 'available', true),
  ('pajero-sport', 'Mitsubishi Pajero Sport', 'pajero-sport', 2, 'Automatic', 'Diesel', 7, 1200000.00, '/cars/pajero.jpg', 'available', true),
  ('honda-brio', 'Honda Brio', 'honda-brio', 3, 'Automatic', 'Bensin', 5, 350000.00, '/cars/brio.jpg', 'available', false),
  ('hiace-commuter', 'Toyota HiAce Commuter', 'hiace-commuter', 5, 'Manual', 'Diesel', 15, 1600000.00, '/cars/hiace.jpg', 'available', false)
ON CONFLICT (id) DO NOTHING;

-- Seed Car Features
INSERT INTO car_features (car_id, feature_name) VALUES
  ('innova-reborn', 'AC Double Blower'),
  ('innova-reborn', 'Capacitive Touchscreen'),
  ('innova-reborn', 'Captain Seat'),
  ('innova-reborn', 'ISOFIX'),
  ('avanza-facelift', 'AC Double Blower'),
  ('avanza-facelift', 'Audio Steering Switch'),
  ('avanza-facelift', 'USB Charging Port'),
  ('fortuner-vrz', '4WD'),
  ('fortuner-vrz', 'Leather Seat'),
  ('fortuner-vrz', 'Power Backdoor'),
  ('pajero-sport', '4WD'),
  ('pajero-sport', 'Leather Seat'),
  ('pajero-sport', 'Sunroof'),
  ('honda-brio', 'AC Digital'),
  ('honda-brio', 'Audio Touchscreen'),
  ('hiace-commuter', 'AC Ducting'),
  ('hiace-commuter', '15 Seats'),
  ('hiace-commuter', 'Reclining Seat')
ON CONFLICT DO NOTHING;

-- Seed Tourism Destinations
INSERT INTO destinations (id, name, description, image, recommended_car) VALUES
  ('pulau-labengki', 'Pulau Labengki', 'Surga tersembunyi dengan laguna biru jernih dan tebing karst yang megah. Destinasi snorkeling dan diving terbaik di Sulawesi Tenggara.', '/destinations/labengki-new.jpg', 'Toyota Fortuner VRZ'),
  ('pantai-toronipa', 'Pantai Toronipa', 'Pantai berpasir putih dengan air laut yang tenang, cocok untuk piknik keluarga dan menikmati sunset spektakuler di pesisir Kendari.', '/destinations/toronipa-new.jpg', 'Toyota Avanza Facelift'),
  ('pulau-bokori', 'Pulau Bokori', 'Pulau kecil nan cantik yang terhubung jembatan, dengan gazebo-gazebo di atas laut dan spot foto ikonik di teluk Kendari.', '/destinations/bokori-new.jpg', 'Honda Brio'),
  ('air-terjun-moramo', 'Air Terjun Moramo', 'Air terjun bertingkat 7 dengan kolam alami berwarna hijau toska. Keindahan alam yang masih asri di kawasan hutan tropis Konawe Selatan.', '/destinations/moramo-new.jpg', 'Mitsubishi Pajero Sport'),
  ('masjid-al-alam', 'Masjid Al-Alam Kendari', 'Masjid terapung ikonik di tengah Teluk Kendari dengan arsitektur modern dan pemandangan laut yang memukau saat senja.', '/destinations/al-alam-new.jpg', 'Toyota Innova Reborn')
ON CONFLICT (id) DO NOTHING;

-- Seed Site Settings
INSERT INTO site_settings (key, value) VALUES
  ('hero', '{"tag": "#1 Rental Mobil Terpercaya di Kendari", "title": "Sewa Mobil Mudah & Terpercaya di Kendari", "description": "Layanan sewa mobil lepas kunci atau dengan driver profesional untuk keperluan dinas, wisata, dan perjalanan keluarga di Sulawesi Tenggara.", "features": ["Antar-jemput Bandara Haluoleo", "Sopir berpengalaman", "Respon cepat via WhatsApp"], "image_url": "/cars/innova-reborn.jpg", "favorite_unit": "Toyota Innova Reborn Premium"}'),
  ('contact', '{"email": "info@sewamobilkendari.com", "address": "Jl. Sultan Hasanuddin No. 12, Mandonga, Kota Kendari, Sulawesi Tenggara 93111", "instagram_url": "https://instagram.com", "maps_embed_url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127116.74872719247!2d122.463242!3d-3.998462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d98b2512f45511b%3A0xa597394c8e718b53!2sKendari%2C%20Kendari%20City%2C%20Southeast%20Sulawesi!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid", "whatsapp_number": "+62 823-4567-8901", "instagram_handle": "@sewamobilkendari_official", "operational_hours": "Senin - Minggu: 24 Jam Nonstop"}')
ON CONFLICT (key) DO NOTHING;

-- Seed Sample Bookings
INSERT INTO bookings (booking_code, car_id, customer_name, customer_phone, customer_email, start_date, end_date, total_days, total_price, status, notes) VALUES
  ('BK-260710-1001', 'innova-reborn', 'Budi Santoso', '081234567890', 'budi@gmail.com', '2026-07-01 00:00:00+00', '2026-07-04 00:00:00+00', 3, 1800000.00, 'completed', NULL),
  ('BK-260712-1002', 'fortuner-vrz', 'PT Haluoleo Energy', '081198765432', 'finance@haluoleoenergy.co.id', '2026-07-05 00:00:00+00', '2026-07-10 00:00:00+00', 5, 6000000.00, 'completed', NULL),
  ('BK-260715-1003', 'avanza-facelift', 'Rina Wijaya', '085244332211', 'rina.w@yahoo.com', '2026-07-12 00:00:00+00', '2026-07-14 00:00:00+00', 2, 900000.00, 'completed', NULL),
  ('BK-260718-1004', 'pajero-sport', 'Ir. Hendra Gunawan', '081377889900', 'hendra@dinas-pu.go.id', '2026-07-16 00:00:00+00', '2026-07-20 00:00:00+00', 4, 6000000.00, 'completed', NULL),
  ('BK-260720-1005', 'honda-brio', 'Dewi Lestari', '082199887766', 'dewi.l@gmail.com', '2026-07-19 00:00:00+00', '2026-07-21 00:00:00+00', 2, 700000.00, 'completed', NULL),
  ('BK-260722-1006', 'fortuner-vrz', 'Dinas Pariwisata Sultra', '081299001122', 'protocol@sultra.go.id', '2026-07-22 00:00:00+00', '2026-07-25 00:00:00+00', 3, 7500000.00, 'confirmed', NULL),
  ('BK-260724-1007', 'hiace-commuter', 'Rombongan Wisata Makassar', '085311223344', 'tour@makassartravel.com', '2026-07-26 00:00:00+00', '2026-07-29 00:00:00+00', 3, 4800000.00, 'pending', NULL)
ON CONFLICT (booking_code) DO NOTHING;
