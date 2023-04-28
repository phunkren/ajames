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
  const headshotData = await headshot;
  const logoData = await logo;
  const fontData = await font;

  /* dynamic variables */
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") ?? PERSONAL.name;
  const description = searchParams.get("description") ?? PERSONAL.description;
  const image = searchParams.get("image") ?? headshotData;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontFamily: '"Euclid"',
          fontSize: 24,
          fontWeight: 400,
          lineHeight: 1.6,
          letterSpacing: 0.36,
          color: "rgb(236,237,238)",
          background: "rgb(21,23,24)",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "32px",
            paddingRight: "48px",
            width: "700px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <img width="32" height="30" src={logoData as any} />

            <span
              style={{
                fontSize: 28,
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: 0.4,
              }}
            >
              {SITE.displayName}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              zIndex: 50,
            }}
          >
            <h1
              style={{
                fontSize: 48,
                fontWeight: 500,
                lineHeight: 1.3,
                letterSpacing: 0.72,
                margin: 0,
                padding: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                padding: 0,
                color: "rgba(255,255,255,0.592)",
              }}
            >
              {description}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "500px",
            height: "100%",
            background:
              "linear-gradient(-35deg, rgb(130, 32, 37) 0%, rgb(16, 42, 76) 50%, rgb(15, 48, 88) 100%)",
            position: "relative",
          }}
        >
          <div
            style={{
              content: "",
              position: "absolute",
              inset: 0,
              left: "120px",
              width: "90%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              filter: "blur(50px)",
            }}
          />

          <img
            src={image as any}
            width="100%"
            height="100%"
            style={{
              objectFit: "cover",
              position: "absolute",
              inset: 0,
              filter: "brightness(75%)",
            }}
          />

          <div
            style={{
              content: "",
              width: "120px",
              height: "100%",
              position: "absolute",
              inset: 0,
              background: "rgb(21,23,24)",
              transform: "skewX(10deg) translateX(-2px)",
              transformOrigin: "left bottom",
            }}
          />

          <div
            style={{
              content: "",
              width: "10px",
              height: "100%",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              background: "rgb(236,237,238)",
              transform: "skewX(10deg)",
              transformOrigin: "left top",
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1686,
      height: 948,
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
