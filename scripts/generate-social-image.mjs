import { writeFile, mkdir } from "node:fs/promises";
import React from "react";
import nextOg from "next/og.js";
const { ImageResponse } = nextOg;
const h = React.createElement;
const image = new ImageResponse(
  h("div", { style: { width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#111213", color: "#f1efe9", padding: "68px 76px", fontFamily: "serif" } },
    h("div", { style: { display: "flex", justifyContent: "space-between", fontFamily: "sans-serif", fontSize: 22, color: "#a5a9a1" } }, h("span", null, "Gabriel Justin."), h("span", null, "Criação de sites")),
    h("div", { style: { display: "flex", flexDirection: "column", maxWidth: 900 } },
      h("span", { style: { fontSize: 90, lineHeight: 0.95, letterSpacing: "-3px" } }, "Seu site pronto"),
      h("span", { style: { fontSize: 90, lineHeight: 0.95, letterSpacing: "-3px", color: "#c3e66d" } }, "em até 7 dias úteis.")),
    h("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", fontFamily: "sans-serif" } },
      h("span", { style: { fontSize: 23, color: "#a5a9a1" } }, "Landing pages + sites institucionais"),
      h("div", { style: { display: "flex", alignItems: "baseline", gap: 10 } },
        h("strong", { style: { fontSize: 66, color: "#c3e66d" } }, "48h"),
        h("span", { style: { fontSize: 20, color: "#a5a9a1" } }, "primeiro conceito visual")))),
  { width: 1200, height: 630 });
await mkdir("public", { recursive: true });
await writeFile("public/social.png", Buffer.from(await image.arrayBuffer()));
console.log("Social image generated: public/social.png (1200x630)");
