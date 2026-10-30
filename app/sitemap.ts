import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { indexable } from "@/lib/seo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return indexable ? [{ url: `${SITE.url}/` }] : [];
}
