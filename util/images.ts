export const FALLBACK_IMAGE_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAnSURBVChTfccxDQAACAMw/MuYusngJT1I+nQm/Xh4eHh4eHh4+Ctd23KZ6cuSX/kAAAAASUVORK5CYII=";

export const ICON_SIZE = {
  xl: 32,
  l: 24,
  m: 18,
  s: 14,
};

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const BLUR_DATA_URL = `data:image/svg+xml;base64,${toBase64(
  shimmer(700, 475)
)}`;

export const hslToHex = (hsl: string): string => {
  // Extract the hue, saturation, and lightness values from the HSL string
  const [_, hStr, sStr, lStr] =
    hsl.match(/^hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)$/i) ?? [];
  const h = parseInt(hStr);
  const s = parseFloat(sStr);
  const l = parseFloat(lStr);

  // Convert HSL values to HEX
  const hex = (h: number, s: number, l: number): string => {
    // Convert hue to a value between 0 and 1
    h = (h % 360) / 360;

    // Convert saturation and lightness to values between 0 and 1
    s = s / 100;
    l = l / 100;

    // Calculate the chroma and intermediate values
    const chroma = (1 - Math.abs(2 * l - 1)) * s;
    const x = chroma * (1 - Math.abs(((h * 6) % 2) - 1));
    const m = l - chroma / 2;

    // Convert the intermediate values to RGB
    let r: number, g: number, b: number;
    if (h < 1 / 6) {
      r = chroma;
      g = x;
      b = 0;
    } else if (h < 2 / 6) {
      r = x;
      g = chroma;
      b = 0;
    } else if (h < 3 / 6) {
      r = 0;
      g = chroma;
      b = x;
    } else if (h < 4 / 6) {
      r = 0;
      g = x;
      b = chroma;
    } else if (h < 5 / 6) {
      r = x;
      g = 0;
      b = chroma;
    } else {
      r = chroma;
      g = 0;
      b = x;
    }

    // Convert RGB to HEX
    const redHex = Math.round((r + m) * 255)
      .toString(16)
      .padStart(2, "0");
    const greenHex = Math.round((g + m) * 255)
      .toString(16)
      .padStart(2, "0");
    const blueHex = Math.round((b + m) * 255)
      .toString(16)
      .padStart(2, "0");

    return `#${redHex}${greenHex}${blueHex}`;
  };

  return hex(h, s, l);
};
