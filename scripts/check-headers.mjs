const origin = process.argv[2];
if (!origin) throw new Error("Informe a URL a verificar: npm run check:headers -- https://seu-dominio");
const paths = ["/", "/projeto/", "/privacidade/", "/robots.txt", "/sitemap.xml", "/opengraph-image", "/pagina-inexistente-teste/"];
for (const path of paths) {
  const response = await fetch(new URL(path, origin), { redirect: "manual" });
  const keys = ["content-type", "cache-control", "x-vercel-cache", "x-robots-tag", "strict-transport-security", "x-content-type-options", "x-frame-options", "referrer-policy", "permissions-policy", "content-security-policy", "location"];
  console.log(JSON.stringify({ path, status: response.status, headers: Object.fromEntries(keys.map((key) => [key, response.headers.get(key)])) }));
  await response.body?.cancel();
}
