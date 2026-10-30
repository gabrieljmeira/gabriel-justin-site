import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  // Allow crawling so bots can read page-level noindex. Never block it with Disallow.
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE.url}/sitemap.xml` };
}
