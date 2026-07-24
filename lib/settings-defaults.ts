export interface HeroSettings {
  tag: string;
  title: string;
  description: string;
  features: string[];
  image_url: string;
  favorite_unit: string;
}

export interface ContactSettings {
  whatsapp_number: string;
  address: string;
  operational_hours: string;
  email: string;
  instagram_handle: string;
  instagram_url: string;
  maps_embed_url: string;
}

export const defaultHeroSettings: HeroSettings = {
  tag: "#1 Rental Mobil Terpercaya di Kendari",
  title: "Sewa Mobil Mudah & Terpercaya di Kendari",
  description:
    "Layanan sewa mobil lepas kunci atau dengan driver profesional untuk keperluan dinas, wisata, dan perjalanan keluarga di Sulawesi Tenggara.",
  features: [
    "Antar-jemput Bandara Haluoleo",
    "Sopir berpengalaman",
    "Respon cepat via WhatsApp",
  ],
  image_url: "/cars/innova-reborn.jpg",
  favorite_unit: "Toyota Innova Reborn Premium",
};

export const defaultContactSettings: ContactSettings = {
  whatsapp_number: "+62 823-4567-8901",
  address:
    "Jl. Sultan Hasanuddin No. 12, Mandonga, Kota Kendari, Sulawesi Tenggara 93111",
  operational_hours: "Senin - Minggu: 24 Jam Nonstop",
  email: "info@sewamobilkendari.com",
  instagram_handle: "@sewamobilkendari_official",
  instagram_url: "https://instagram.com",
  maps_embed_url:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127116.74872719247!2d122.463242!3d-3.998462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d98b2512f45511b%3A0xa597394c8e718b53!2sKendari%2C%20Kendari%20City%2C%20Southeast%20Sulawesi!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid",
};
