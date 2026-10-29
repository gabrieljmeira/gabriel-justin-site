import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// Check the shipped HTML, including business terms and navigation across all public routes.
const origin = "https://gabriel-justin-site.vercel.app";
const routes = ["/", "/projeto/", "/privacidade/"];
const htmlFor = (route) => readFileSync(join("out", route, "index.html"), "utf8");
for (const route of routes) {
  const html = htmlFor(route);
  assert.ok(html.includes(`rel="canonical" href="${origin}${route}"`), `canonical: ${route}`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `one h1: ${route}`);
  assert.ok(html.includes('lang="pt-BR"'), `language: ${route}`);
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const url = new URL(match[1].replaceAll("&amp;", "&"), `${origin}${route}`);
    if (url.hostname === "wa.me") {
      assert.equal(url.pathname, "/5551984402298", "WhatsApp destination");
      assert.ok(url.searchParams.get("text"), "WhatsApp message");
    }
    if (url.origin !== origin) continue;
    const target = htmlFor(url.pathname);
    if (url.hash) assert.ok(target.includes(`id="${url.hash.slice(1)}"`), `anchor: ${url.href}`);
  }
}
const home = htmlFor("/");
for (const text of ["600", "1.000", "300/ano", "7 dias úteis", "48h", "Registrado em seu nome", "A partir de"])
  assert.ok(home.includes(text), `business term: ${text}`);
assert.ok(!home.includes('id="projetos"'), "Projects stays removed");
assert.ok(!home.includes("data-count"), "fixed offer is not a counter");
const sitemap = readFileSync("out/sitemap.xml", "utf8");
for (const route of routes) assert.ok(sitemap.includes(`<loc>${origin}${route}</loc>`));
assert.ok(readFileSync("out/robots.txt", "utf8").includes(`${origin}/sitemap.xml`));
assert.ok(existsSync("out/favicon.svg"), "favicon exists");
console.log("Export verified: 3 routes, canonical URLs, internal anchors, WhatsApp and commercial terms.");
