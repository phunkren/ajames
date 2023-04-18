import { blueDark, redDark, slateDark } from "@radix-ui/colors";
import Image from "next/image";
import { gsap } from "gsap";
import { memo, useLayoutEffect, useRef, useState } from "react";
import { darkTheme, lightTheme, styled } from "../../stitches.config";
import headshot from "../../public/images/headshot.png";
import { Box } from "../Box";
import { PERSONAL } from "../../util/data";
import { TextSubtitle, TextTitle } from "../Text";
import { Social } from "../Social";

const StyledHeroLayout = styled(Box, {
  height: "100svh",
  width: "100vw",
  overflow: "hidden",
  position: "relative",
  color: "$foreground",

  "@supports not (height: 100svh)": {
    height: "100vh",
  },

  "@print": {
    display: "none !important",
  },
});

const StyledHeroContainer = styled(Box, {
  background: slateDark.slate1,
  color: slateDark.slate12,
  overflow: "hidden",

  "@print": {
    display: "none !important",
  },
});

const StyledImage = styled(Image, {
  position: "absolute",
  height: "90svh",
  bottom: 0,
  right: 0,
  transition:
    "filter $transitions$durationDefault $transitions$functionDefault",
  pointerEvents: "none",
  objectPosition: "bottom",
  zIndex: 6,

  "@supports not (height: 100svh)": {
    height: "90vh",
  },

  "@landscape": {
    objectFit: "contain",
    right: "5%",
    transform: "translateX(25%)",

    "@bp4": {
      right: "22.5%",
    },
  },

  "@portrait": {
    objectFit: "cover",
    width: "100%",
  },

  [`.${darkTheme} &`]: {
    filter: "brightness(66%)",
  },

  [`.${lightTheme} &`]: {
    filter: "brightness(75%)",
  },
});

const Base = styled("div", {
  content: "",
  position: "absolute",
  willChange: "transform",
  filter: "blur(400px)",
});

const HeroOne = styled(Base, {
  width: "33vw",
  height: "110vh",
  left: "17vw",
  top: "-10vh",
  transformOrigin: "top left",
  transform: "rotate(33deg)",
  background: `linear-gradient(-45deg, ${blueDark.blue3} 0%, ${blueDark.blue4} 50%, ${blueDark.blue5} 100%)`,
  backgroundImage: `-webkit-linear-gradient(-45deg, ${blueDark.blue3} 0%, ${blueDark.blue4} 50%, ${blueDark.blue5} 100%)`,
  zIndex: 1,
});

const HeroTwo = styled(Base, {
  width: "33vw",
  height: "117vh",
  left: "20vw",
  top: "5vh",
  background: `linear-gradient(240deg, ${blueDark.blue9} 0%, ${blueDark.blue7} 50%, ${blueDark.blue5} 100%)`,
  backgroundImage: `-webkit-linear-gradient(240deg, ${blueDark.blue9} 0%, ${blueDark.blue7} 50%, ${blueDark.blue5} 100%)`,
  transformOrigin: "top left",
  transform: "rotate(-45deg)",
  zIndex: 2,
});

const HeroThree = styled(Base, {
  top: "95vh",
  left: "36vw",
  width: "28vw",
  height: "34vh",
  background: `linear-gradient(140deg, ${redDark.red11} 0%, ${redDark.red9} 50%, ${redDark.red7} 100%)`,
  backgroundImage: `-webkit-linear-gradient(140deg, ${redDark.red11} 0%, ${redDark.red9} 50%, ${redDark.red7} 100%)`,
  transformOrigin: "bottom left",
  transform: "rotate(-45deg)",
  zIndex: 3,
});

const HeroFour = styled(Base, {
  top: "-50vh",
  left: "45vw",
  width: "33vw",
  height: "124vh",
  background: `linear-gradient(33deg, ${redDark.red3} 0%, ${redDark.red4} 50%, ${redDark.red5} 100%)`,
  backgroundImage: `-webkit-linear-gradient(33deg, ${redDark.red3} 0%, ${redDark.red4} 50%, ${redDark.red5} 100%)`,
  transformOrigin: "bottom left",
  transform: "rotate(45deg)",
  zIndex: 4,
});

const ANIMATION_A = {
  x: -75,
  y: -50,
  duration: 10,
  repeat: -1,
  yoyo: true,
  ease: "slow.in",
};

const ANIMATION_B = {
  x: 75,
  y: -50,
  duration: 20,
  repeat: -1,
  yoyo: true,
  ease: "slow.out",
};

export const Hero = memo(function HeroLayout() {
  const [isLoaded, setIsLoaded] = useState(false);
  const comp = useRef();
  const oneRef = useRef(null);
  const twoRef = useRef(null);
  const threeRef = useRef(null);
  const fourRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(oneRef.current, ANIMATION_A, ANIMATION_B);
      gsap.fromTo(twoRef.current, ANIMATION_B, ANIMATION_A);
      gsap.fromTo(threeRef.current, ANIMATION_B, ANIMATION_A);
      gsap.fromTo(fourRef.current, ANIMATION_A, ANIMATION_B);
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <StyledHeroLayout ref={comp}>
      <StyledHeroContainer direction="vertical" flexGrow>
        <HeroOne ref={oneRef} />
        <HeroTwo ref={twoRef} />
        <HeroThree ref={threeRef} />
        <HeroFour ref={fourRef} />

        <StyledImage
          src={headshot}
          alt=""
          placeholder={!isLoaded ? "blur" : "empty"}
          sizes="(max-width: 1020px) 100vw, 1276px"
          priority
          onLoad={() => setIsLoaded(true)}
        />
        <Box
          direction="vertical"
          spacingHorizontal={{ "@initial": 6, "@bp2": 10 }}
          flexGrow
        >
          <Box direction="vertical" position="relative" flexGrow>
            <Box direction="vertical" container="l" flexGrow>
              <Box
                direction="vertical"
                spacingBottom={4}
                justifyContent={{
                  "@portrait": "flex-end",
                  "@landscape": "center",
                }}
                alignItems={{
                  "@portrait": "center",
                  "@landscape": "flex-start",
                }}
                css={{ zIndex: 6 }}
                flexGrow
              >
                <TextTitle
                  color="currentColor"
                  css={{ textShadow: "$textShadow" }}
                >
                  {PERSONAL.name}
                </TextTitle>

                <TextSubtitle
                  color="currentColor"
                  css={{ textShadow: "$textShadow" }}
                >
                  {PERSONAL.occupation} / {PERSONAL.location}
                </TextSubtitle>

                <Box position="relative" spacingTop={4} css={{ left: "-$1" }}>
                  <Social
                    size={{
                      "@initial": "m",
                      "@bp2": "l",
                      "@bp3": "m",
                    }}
                    gap="3"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </StyledHeroContainer>
    </StyledHeroLayout>
  );
});
