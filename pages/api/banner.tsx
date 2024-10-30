import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { PERSONAL, SITE } from "../../util/data";

export const config = {
  runtime: "edge",
};

const headshot = fetch(
  new URL("../../public/images/mugshot.png", import.meta.url)
).then((res) => res.arrayBuffer());

const logo = fetch(
  new URL("../../public/images/logo.png", import.meta.url)
).then((res) => res.arrayBuffer());

// Make sure the font exists in the specified path:
const font = fetch(
  new URL("../../public/fonts/euclid-medium.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(request: NextRequest) {
  const logoData = await logo;
  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontFamily: '"Euclid"',
          fontSize: 26,
          fontWeight: 400,
          lineHeight: 1.6,
          letterSpacing: 0.36,
          color: "rgb(235,237,238)",
          background: "rgb(21,23,24)",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 72px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "16px",
            }}
          >
            <img width="440" height="410" src={logoData as any} />

            <span
              style={{
                fontSize: 220,
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: 0.4,
              }}
            >
              {SITE.displayName}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 4096,
      height: 2304,
      fonts: [
        {
          name: "Euclid",
          data: fontData,
          weight: 500,
          style: "normal",
        },
      ],
    }
  );
}
