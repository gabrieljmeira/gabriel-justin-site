const fallbackUrl = "https://gabriel-justin-site.vercel.app";
function siteOrigin(value: string | undefined) {
  if (!value) return fallbackUrl;
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("NEXT_PUBLIC_SITE_URL deve ser uma origem HTTPS, sem caminho, parâmetros ou credenciais.");
  }
  return url.origin;
}
export const SITE = {
  name: "Gabriel Justin",
  url: siteOrigin(process.env.NEXT_PUBLIC_SITE_URL),
  whatsapp: "5551984402298",
  whatsappDisplay: "+55 51 98440-2298",
  accent: "#C3E66D",
};
export function whatsappUrl(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
