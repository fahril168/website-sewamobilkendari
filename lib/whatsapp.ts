const WHATSAPP_NUMBER = "6282345678901";

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
  pricePerDay: number
): string {
  const formattedPrice = formatPrice(pricePerDay);
  const message = `Halo SewaMobilKendari.com, saya ingin memesan mobil ${carName} dengan harga ${formattedPrice}/Hari. Mohon informasi ketersediaannya.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function generateGeneralWhatsAppLink(): string {
  const message =
    "Halo SewaMobilKendari.com, saya ingin bertanya tentang layanan sewa mobil di Kendari.";
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
