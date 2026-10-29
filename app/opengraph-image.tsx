import { ImageResponse } from "next/og";

export const alt = "Gabriel Justin — Criação de sites";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111213",
          color: "#f1efe9",
          padding: "68px 76px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "sans-serif",
            fontSize: 22,
            color: "#a5a9a1",
          }}
        >
          <span>Gabriel Justin.</span>
          <span>Criação de sites</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <span style={{ fontSize: 90, lineHeight: 0.95, letterSpacing: "-3px" }}>
            Seu site pronto
          </span>
          <span
            style={{
              fontSize: 90,
              lineHeight: 0.95,
              letterSpacing: "-3px",
              color: "#c3e66d",
            }}
          >
            em até 7 dias úteis.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            fontFamily: "sans-serif",
          }}
        >
          <span style={{ fontSize: 23, color: "#a5a9a1" }}>
            Landing pages + sites institucionais
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <strong style={{ fontSize: 66, color: "#c3e66d" }}>48h</strong>
            <span style={{ fontSize: 20, color: "#a5a9a1" }}>primeiro conceito visual</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
