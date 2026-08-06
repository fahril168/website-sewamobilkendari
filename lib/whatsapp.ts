const DEFAULT_WHATSAPP_NUMBER = "6282345678901";

export function sanitizePhoneNumber(phone?: string): string {
  if (!phone) return DEFAULT_WHATSAPP_NUMBER;
  const cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("0")) {
    return "62" + cleaned.slice(1);
  }
  return cleaned || DEFAULT_WHATSAPP_NUMBER;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function generateWhatsAppLink(
  carName: string,
  pricePerDay: number,
  phone?: string
): string {
  const formattedPrice = formatPrice(pricePerDay);
  const targetNumber = sanitizePhoneNumber(phone);
  const message = `Halo SewaMobilKendari.com, saya ingin memesan mobil ${carName} dengan harga ${formattedPrice}/Hari. Mohon informasi ketersediaannya.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${targetNumber}?text=${encodedMessage}`;
}

export function generateGeneralWhatsAppLink(phone?: string): string {
  const targetNumber = sanitizePhoneNumber(phone);
  const message =
    "Halo SewaMobilKendari.com, saya ingin bertanya tentang layanan sewa mobil di Kendari.";
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${targetNumber}?text=${encodedMessage}`;
}

export function generateDestinationWhatsAppLink(
  destinationName: string,
  recommendedCar?: string,
  phone?: string
): string {
  const targetNumber = sanitizePhoneNumber(phone);
  const carText = recommendedCar ? ` dengan rekomendasi mobil ${recommendedCar}` : "";
  const message = `Halo SewaMobilKendari.com, saya ingin konsultasi sewa mobil untuk wisata ke ${destinationName}${carText}. Mohon informasi dan penawaran terbaiknya.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${targetNumber}?text=${encodedMessage}`;
}
