import { readdir, readFile, writeFile } from "node:fs/promises";
const directory = process.argv[2] || "lighthouse-results";
const rows = [];
for (const name of await readdir(directory)) {
  if (!/^(mobile|desktop)-[123]\.json$/.test(name)) continue;
  const lhr = JSON.parse(await readFile(directory + "/" + name, "utf8"));
  rows.push({
    file: name, version: lhr.lighthouseVersion, time: lhr.fetchTime, url: lhr.finalDisplayedUrl,
    scores: Object.fromEntries(Object.entries(lhr.categories).map(([id, c]) => [id, c.score])),
    lcp: lhr.audits["largest-contentful-paint"].numericValue,
    cls: lhr.audits["cumulative-layout-shift"].numericValue,
    tbt: lhr.audits["total-blocking-time"].numericValue,
    warnings: lhr.runWarnings,
    failures: Object.entries(lhr.audits).filter(([, audit]) => audit.score === 0).map(([id, audit]) => ({ id, title: audit.title })),
  });
}
if (!rows.length) throw new Error("Nenhum resultado Lighthouse encontrado.");
const result = { environment: "Static export on localhost in CI. Simulated lab throttling; not field data. TBT is not INP. SEO intentionally includes noindex on the temporary domain.", rows };
await writeFile(directory + "/summary.json", JSON.stringify(result, null, 2));
console.log(JSON.stringify(result));
