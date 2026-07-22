export interface Car {
  id: string;
  name: string;
  type: "SUV" | "MPV" | "City Car" | "Van";
  transmission: "Manual" | "Automatic";
  fuel: string;
  capacity: number;
  pricePerDay: number;
  image: string;
  features: string[];
}

export const cars: Car[] = [
  {
    id: "innova-reborn",
    name: "Toyota Innova Reborn",
    type: "MPV",
    transmission: "Automatic",
    fuel: "Diesel",
    capacity: 7,
    pricePerDay: 550000,
    image: "/cars/innova-reborn.jpg",
    features: ["AC Double Blower", "Captain Seat", "Cruise Control"],
  },
  {
    id: "avanza-facelift",
    name: "Toyota Avanza Facelift",
    type: "MPV",
    transmission: "Manual",
    fuel: "Bensin",
    capacity: 7,
    pricePerDay: 350000,
    image: "/cars/avanza-facelift.jpg",
    features: ["AC Double Blower", "Power Steering", "Airbag"],
  },
  {
    id: "pajero-sport",
    name: "Mitsubishi Pajero Sport",
    type: "SUV",
    transmission: "Automatic",
    fuel: "Diesel",
    capacity: 7,
    pricePerDay: 750000,
    image: "/cars/pajero-sport.jpg",
    features: ["4WD", "Leather Seat", "Sunroof"],
  },
  {
    id: "fortuner-vrz",
    name: "Toyota Fortuner VRZ",
    type: "SUV",
    transmission: "Automatic",
    fuel: "Diesel",
    capacity: 7,
    pricePerDay: 800000,
    image: "/cars/fortuner-vrz.jpg",
    features: ["4WD", "Leather Seat", "360° Camera"],
  },
  {
    id: "honda-brio",
    name: "Honda Brio",
    type: "City Car",
    transmission: "Automatic",
    fuel: "Bensin",
    capacity: 5,
    pricePerDay: 300000,
    image: "/cars/honda-brio.jpg",
    features: ["Eco Mode", "Bluetooth Audio", "Airbag"],
  },
  {
    id: "hiace-commuter",
    name: "Toyota HiAce Commuter",
    type: "Van",
    transmission: "Manual",
    fuel: "Diesel",
    capacity: 16,
    pricePerDay: 900000,
    image: "/cars/hiace-commuter.jpg",
    features: ["AC Ducting", "Reclining Seat", "Bagasi Luas"],
  },
];
