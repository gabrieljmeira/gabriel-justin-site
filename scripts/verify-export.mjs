import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { SITE } from "../lib/site.ts";

const origin = SITE.url;
const indexable = process.env.VERCEL_ENV !== "preview" && !new URL(origin).hostname.endsWith(".vercel.app");
const routes = ["/", "/projeto/", "/privacidade/", "/demonstracoes/landing-page/", "/demonstracoes/institucional/"];
const htmlFor = (route) => readFileSync(join("out", route, "index.html"), "utf8");
for (const route of routes) {
  const html = htmlFor(route);
  assert.ok(html.includes(`rel="canonical" href="${origin}${route}"`), `canonical: ${route}`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `one h1: ${route}`);
  assert.ok(html.includes('lang="pt-BR"'), `language: ${route}`);
  assert.ok(html.includes('property="og:url"'), `og:url: ${route}`);
  assert.ok(html.includes('property="og:image"'), `social image: ${route}`);
  if (route !== "/" || !indexable) assert.match(html, /name="robots" content="noindex, follow"/);
  else assert.match(html, /name="robots" content="index, follow"/);
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const url = new URL(match[1].replaceAll("&amp;", "&"), `${origin}${route}`);
    if (url.hostname === "wa.me") {
      assert.equal(url.pathname, "/5551984402298", "WhatsApp destination approved by owner");
      assert.ok(url.searchParams.get("text"), "WhatsApp message");
    }
    if (url.origin !== origin) continue;
    const target = htmlFor(url.pathname);
    if (url.hash) assert.ok(target.includes(`id="${url.hash.slice(1)}"`), `anchor: ${url.href}`);
  }
}
const home = htmlFor("/");
for (const text of ["600 a R$", "900", "1.000 a R$", "1.600", "300/ano", "Pagamento por Pix", "7 dias úteis", "48h", "Registrado em seu nome", "Gravataí", "Demonstrativo"])
  assert.ok(home.toLowerCase().includes(text.toLowerCase()), `business term: ${text}`);
const json = home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert.ok(json, "structured data present");
const schema = JSON.parse(json[1]);
assert.equal(schema["@graph"].filter((item) => item["@type"] === "Service").length, 2);
assert.ok(!home.includes("data-count"), "fixed offer is not a counter");
const sitemap = readFileSync("out/sitemap.xml", "utf8");
assert.equal((sitemap.match(/<loc>/g) ?? []).length, indexable ? 1 : 0);
if (indexable) assert.ok(sitemap.includes(`<loc>${origin}/</loc>`));
assert.ok(readFileSync("out/robots.txt", "utf8").includes(`${origin}/sitemap.xml`));
assert.ok(existsSync("out/favicon.svg"));
assert.ok(existsSync("out/opengraph-image"));
assert.ok(htmlFor("/projeto/").includes("/privacidade/"));
console.log("Export verified: 5 routes, approved commercial terms, DDD 51, social metadata, schema, internal links and indexing policy.");

const config = JSON.parse(readFileSync("vercel.json", "utf8"));
assert.ok(config.headers.some((rule) => rule.source.startsWith("/opengraph-image") && rule.headers.some((header) => header.key.toLowerCase() === "content-type" && header.value === "image/png")), "OG image MIME configured for extensionless static export");
