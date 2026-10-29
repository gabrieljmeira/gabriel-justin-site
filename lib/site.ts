export const SITE = {
  name: "Gabriel Justin",
  url: "https://gabriel-justin-site.vercel.app",
  whatsapp: "5551984402298",
  whatsappDisplay: "+55 51 98440-2298",
  accent: "#C3E66D",
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
