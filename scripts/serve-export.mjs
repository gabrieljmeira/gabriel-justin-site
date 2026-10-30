import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";
import { brotliCompressSync } from "node:zlib";
const root = resolve("out");
const vercel = JSON.parse(await readFile("vercel.json", "utf8"));
const headers = Object.fromEntries(vercel.headers[0].headers.map(({ key, value }) => [key, value]));
const mime = { ".html": "text/html; charset=utf-8", ".js": "application/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".woff2": "font/woff2", ".png": "image/png" };
createServer(async (request, response) => {
  try {
    const url = new URL(request.url, "http://127.0.0.1");
    const path = decodeURIComponent(url.pathname);
    let file = resolve(root, "." + path);
    if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403).end(); return; }
    let status = 200;
    const info = await stat(file).catch(() => null);
    if (info?.isDirectory()) {
      if (!path.endsWith("/")) { response.writeHead(308, { Location: url.pathname + "/" + url.search }).end(); return; }
      file = resolve(file, "index.html");
    } else if (!info) { file = resolve(root, "404.html"); status = 404; }
    let body = await readFile(file);
    const type = mime[extname(file)] || (path === "/opengraph-image" ? "image/png" : "application/octet-stream");
    const resultHeaders = { ...headers, "Content-Type": type, "Cache-Control": path.startsWith("/_next/static/") ? "public, max-age=31536000, immutable" : "no-cache" };
    if (/text|javascript|xml|svg/.test(type) && request.headers["accept-encoding"]?.includes("br")) {
      body = brotliCompressSync(body); resultHeaders["Content-Encoding"] = "br"; resultHeaders.Vary = "Accept-Encoding";
    }
    resultHeaders["Content-Length"] = String(body.length);
    response.writeHead(status, resultHeaders);
    response.end(request.method === "HEAD" ? undefined : body);
  } catch { response.writeHead(404).end("Not found"); }
}).listen(Number(process.env.PORT || 4173), "127.0.0.1", () => console.log("Export ready: http://127.0.0.1:" + (process.env.PORT || 4173)));
