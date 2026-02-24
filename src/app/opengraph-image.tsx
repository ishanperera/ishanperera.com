import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ishan Perera, D.O. — Neurosurgeon, Developer, Entrepreneur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0F",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            color: "#00E5FF",
            fontSize: 20,
            letterSpacing: "0.2em",
            marginBottom: 24,
          }}
        >
          NEUROSURGEON . DEVELOPER . ENTREPRENEUR
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#F0F0F5",
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          ISHAN PERERA
        </div>
        <div style={{ color: "#A0A0B8", fontSize: 28 }}>
          PGY-1 Neurosurgery Resident | Henry Ford Providence Hospital
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            color: "#5A5A72",
            fontSize: 18,
          }}
        >
          ishanperera.com
        </div>
      </div>
    ),
    { ...size }
  );
}
