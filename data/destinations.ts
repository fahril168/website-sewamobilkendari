export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  recommendedCar: string;
}

export const destinations: Destination[] = [
  {
    id: "pulau-labengki",
    name: "Pulau Labengki",
    description:
      "Surga tersembunyi dengan laguna biru jernih dan tebing karst yang megah. Destinasi snorkeling dan diving terbaik di Sulawesi Tenggara.",
    image: "/destinations/labengki-new.jpg",
    recommendedCar: "Toyota Fortuner VRZ",
  },
  {
    id: "pantai-toronipa",
    name: "Pantai Toronipa",
    description:
      "Pantai berpasir putih dengan air laut yang tenang, cocok untuk piknik keluarga dan menikmati sunset spektakuler di pesisir Kendari.",
    image: "/destinations/toronipa-new.jpg",
    recommendedCar: "Toyota Avanza Facelift",
  },
  {
    id: "pulau-bokori",
    name: "Pulau Bokori",
    description:
      "Pulau kecil nan cantik yang terhubung jembatan, dengan gazebo-gazebo di atas laut dan spot foto ikonik di teluk Kendari.",
    image: "/destinations/bokori-new.jpg",
    recommendedCar: "Honda Brio",
  },
  {
    id: "air-terjun-moramo",
    name: "Air Terjun Moramo",
    description:
      "Air terjun bertingkat 7 dengan kolam alami berwarna hijau toska. Keindahan alam yang masih asri di kawasan hutan tropis Konawe Selatan.",
    image: "/destinations/moramo-new.jpg",
    recommendedCar: "Mitsubishi Pajero Sport",
  },
  {
    id: "masjid-al-alam",
    name: "Masjid Al-Alam Kendari",
    description:
      "Masjid terapung ikonik di tengah Teluk Kendari dengan arsitektur modern dan pemandangan laut yang memukau saat senja.",
    image: "/destinations/al-alam-new.jpg",
    recommendedCar: "Toyota Innova Reborn",
  },
];
