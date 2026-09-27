import { ImageResponse } from "next/og";

export const alt = "Shri Kanhaiya Traders — Building Materials & Paints";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card. Text is in English because the image renderer cannot shape Devanagari. */
export default function OpengraphImage() {
  const swatches = ["#4E8189", "#A8C3A0", "#F09F72", "#F6B994", "#E8A5A0"];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#1F383F", color: "white", padding: 72, fontFamily: "sans-serif", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 88, height: 88, borderRadius: 22, background: "#27444B", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #F09F72" }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: "#FFFFFF", letterSpacing: 1 }}>SKT</div>
            </div>
            <div style={{ fontSize: 26, color: "#F6B994", letterSpacing: 4, textTransform: "uppercase" }}>Building Materials • Paints • Construction</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.05 }}>Shri Kanhaiya Traders</div>
            <div style={{ fontSize: 36, marginTop: 24, color: "#E2EEEE" }}>Everything you need to build, paint & renovate.</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {swatches.map((c) => (
              <div key={c} style={{ width: 90, height: 18, borderRadius: 9, background: c }} />
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
