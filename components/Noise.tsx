import { memo } from "react";
import { styled, lightTheme } from "../stitches.config";

const StyledSvg = styled("svg", {
  position: "fixed",
  inset: 0,
  width: "100%",
  height: "100%",

  [`.${lightTheme} &`]: {
    opacity: 0.25,
  },

  "@print": { display: "none !important" },
});

export const Noise = memo(function Noise() {
  return (
    <StyledSvg id="noice-1">
      <filter id="noise-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="1.9998"
          numOctaves="20"
          stitchTiles="stitch"
        ></feTurbulence>
        <feColorMatrix type="saturate" values="0"></feColorMatrix>
        <feComponentTransfer>
          <feFuncR type="linear" slope="0.33"></feFuncR>
          <feFuncG type="linear" slope="0.33"></feFuncG>
          <feFuncB type="linear" slope="0.33"></feFuncB>
          <feFuncA type="linear" slope="0.3"></feFuncA>
        </feComponentTransfer>
        <feComponentTransfer>
          <feFuncR type="linear" slope="1.75" intercept="-0.50" />
          <feFuncG type="linear" slope="1.75" intercept="-0.50" />
          <feFuncB type="linear" slope="1.75" intercept="-0.50" />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter="url(#noise-filter)"></rect>
    </StyledSvg>
  );
});
