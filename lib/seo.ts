import { SITE } from "./site";

export const indexable = process.env.VERCEL_ENV !== "preview" && !new URL(SITE.url).hostname.endsWith(".vercel.app");

export function pageSocial(title: string, description: string, path: string) {
  return {
    openGraph: {
      title, description, url: new URL(path, SITE.url).href,
      type: "website" as const, locale: "pt_BR",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Gabriel Justin: criação de sites" }],
    },
    twitter: {
      card: "summary_large_image" as const, title, description,
      images: [{ url: "/opengraph-image", alt: "Gabriel Justin: criação de sites" }],
    },
  };
}
