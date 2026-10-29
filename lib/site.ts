export const SITE = {
  name: "Gabriel Justin",
  whatsapp: "5515984402298",
  whatsappDisplay: "+55 15 98440-2298",
  accent: "#C3E66D",
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
