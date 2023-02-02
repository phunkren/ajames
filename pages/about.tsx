import { ReactElement } from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import {
  DownloadIcon,
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  HomeIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import { PrintButton, StyledIconButton } from "../components/Button";
import { Divider } from "../components/Divider";
import { ActionButtons, Layout } from "../components/Layout";
import { Link, StyledIconLink } from "../components/Link";
import {
  TextAux,
  TextBody,
  TextHeadline,
  TextTitle1,
  TextTitle3,
} from "../components/Text";
import { darkTheme, lightTheme, styled } from "../stitches.config";
import {
  EDUCATION,
  EMPLOYMENT,
  EXPERTISE,
  INTERESTS,
  PERSONAL,
  SITE,
  SOCIAL,
  TESTIMONIALS,
} from "../util/data";
import { formatLongDate } from "../util/date";
import { ICON_SIZE } from "../util/images";
import banner from "../public/images/mugshot.png";
import { Box } from "../components/Box";
import { NextPageWithLayout } from "./_app";

const StyledPrintHeader = styled(Box, {
  display: "none",

  "@print": {
    display: "block",
  },
});

const StyledPageHeader = styled(Box, {
  display: "block",
  position: "relative",
  left: "-$2",
  width: "100vw",
  overflow: "hidden",
  borderRadius: 0,
  marginBottom: "$2",
  color: "$foreground",

  "@bp2": {
    marginBottom: "$10",
    left: "-$7",
  },

  "@bp3": {
    left: 0,
    width: "100%",
    borderRadius: 4,
  },

  "@print": {
    display: "none",
  },
});

const StyledHero = styled(Box, {
  position: "absolute",
  inset: 0,
  zIndex: 1,
  borderBottomWidth: 5,
  borderBottomStyle: "solid",
  borderBottomColor: "$foreground",

  "@bp2": {
    [`.${lightTheme} &`]: {
      color: "white",

      [`${TextTitle1}, ${TextHeadline}`]: {
        color: "inherit",
      },

      [`${StyledIconButton}, ${StyledIconLink}`]: {
        color: "inherit",
        borderColor: "inherit",

        "&:hover": {
          background: "white",
          borderColor: "white",
          color: "black",
        },
      },
    },

    "&::after": {
      content: "",
      position: "absolute",
      inset: 0,

      [`.${darkTheme} &`]: {
        background: "rgba(0,0,0,0.15)",
      },

      [`.${lightTheme} &`]: {
        background: "rgba(0,0,0,0.75)",
      },
    },
  },
});

const StyledFilter = styled(Box, {
  position: "absolute",
  inset: 0,
  zIndex: 0,
  filter: "blur(80px)",

  "@bp2": {
    [`.${darkTheme} &`]: {
      background: "conic-gradient(from 50deg, $red3, $red2, $blue2, $blue4)",
    },

    [`.${lightTheme} &`]: {
      background:
        "conic-gradient(from 50deg, $red11, $red11, $blue10, $blue11)",
    },
  },
});

const StyledImage = styled(Image, {
  display: "none",
  objectFit: "contain",
  borderRadius: 0,
  position: "absolute",
  top: "9% !important",
  zIndex: 1,
  transform: "scale(0.8)",
  pointerEvents: "none",
  filter: "brightness(75%)",

  "@bp2": {
    display: "block",
    borderRadius: 4,
    left: "25% !important",
  },

  "@bp3": {
    display: "block",
    borderRadius: 4,
    left: "18% !important",
  },
});

const StyledBlockQuote = styled("blockquote", {
  fontStyle: "oblique",
  textAlign: "justify",

  "@print": {
    display: "-webkit-box",
    overflow: "hidden",
    textAlign: "left",

    ["-webkit-line-clamp"]: "5",
    ["-webkit-box-orient"]: "vertical",
  },
});

const GridRoot = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "repeat(auto, 1fr)",
  gridColumnGap: "$4",
  gridRowGap: "$4",

  "@print": {
    gridTemplateColumns: "1fr",
    gridColumnGap: "$1",
  },

  "@bp2": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  "@bp3": {
    gridTemplateColumns: "1fr",
  },
});

const GridItem = styled("div", {
  padding: "$2",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "$foregroundMuted",
  textAlign: "center",
  borderRadius: 4,

  "@print": {
    padding: 0,
    border: "none",
    textAlign: "left",
    lineHeight: 1,
  },
});

const About: NextPageWithLayout = () => {
  return (
    <Box>
      <Box direction="vertical">
        <StyledPageHeader>
          <AspectRatio ratio={2.5 / 1}>
            <StyledImage src={banner} alt="" sizes="100vw" priority fill />

            <StyledFilter />

            <StyledHero
              spacingHorizontal={{ "@initial": 6, "@bp2": 10 }}
              spacingVertical={{ "@initial": 10, "@bp2": 7 }}
              alignItems="flex-end"
              justifyContent="space-between"
            >
              <Box
                direction="vertical"
                spacingLeft={{ "@bp2": 10, "@bp3": 0 }}
                css={{ zIndex: 1 }}
              >
                <TextTitle1 css={{ "@bp2": { textShadow: "$textShadow" } }}>
                  {PERSONAL.name}
                </TextTitle1>
                <TextHeadline css={{ "@bp2": { textShadow: "$textShadow" } }}>
                  {PERSONAL.occupation} / {PERSONAL.location}
                </TextHeadline>
              </Box>

              <ActionButtons
                display={{ "@initial": "none", "@bp3": "flex" }}
                css={{ zIndex: 1 }}
              >
                <PrintButton />

                <StyledIconLink href="/download-cv" title="Download" download>
                  <DownloadIcon
                    width={ICON_SIZE.m}
                    height={ICON_SIZE.m}
                    aria-hidden
                  />
                </StyledIconLink>
              </ActionButtons>
            </StyledHero>
          </AspectRatio>
        </StyledPageHeader>

        <StyledPrintHeader>
          <Box
            direction="vertical"
            spacingHorizontal={3}
            spacingBottom={6}
            css={{ borderBottom: "2px solid black" }}
          >
            <TextTitle1>{PERSONAL.name}</TextTitle1>
            <TextHeadline>{PERSONAL.occupation} / Glasgow, UK</TextHeadline>
          </Box>
        </StyledPrintHeader>

        <Box
          id="__cv"
          direction="horizontal"
          gap={{ "@print": 4, "@initial": 0, "@bp2": 10 }}
          spacingHorizontal={{ "@print": 3, "@initial": 4, "@bp2": 10 }}
          spacingTop={{ "@print": 6, "@initial": 10 }}
          spacingBottom={{ "@print": 0, "@initial": 10 }}
          flexWrap={{
            "@print": "nowrap",
            "@initial": "wrapReverse",
            "@bp3": "nowrap",
          }}
          flexGrow
        >
          <Box
            direction="vertical"
            gap={10}
            css={{
              "@print": { flexGrow: 0, flexShrink: 0, flexBasis: 125 },
              "@bp3": { flexGrow: 0, flexShrink: 0, flexBasis: 250 },
            }}
          >
            <Box as="section" aria-labelledby="contact" direction="vertical">
              <TextTitle3 as="h2" id="contact">
                Contact
              </TextTitle3>

              <Box
                spacingTop={{ "@print": 2, "@initial": 4 }}
                spacingBottom={{ "@print": 4, "@initial": 6 }}
              >
                <Divider />
              </Box>

              <GridRoot>
                <Link
                  variant="secondary"
                  href={SOCIAL.linkedin.url}
                  title={SOCIAL.linkedin.displayName}
                >
                  <Box direction="horizontal" gap={4} alignItems="center">
                    <LinkedInLogoIcon
                      width={ICON_SIZE.m}
                      height={ICON_SIZE.m}
                      aria-hidden
                    />
                    <TextHeadline>Andrew James</TextHeadline>
                  </Box>
                </Link>

                <Link
                  variant="secondary"
                  href="mailto:contact@ajames.dev"
                  title="Email"
                >
                  <Box direction="horizontal" gap={4} alignItems="center">
                    <EnvelopeOpenIcon
                      width={ICON_SIZE.m}
                      height={ICON_SIZE.m}
                      aria-hidden
                    />
                    <TextHeadline>contact@ajames.dev</TextHeadline>
                  </Box>
                </Link>

                <Link variant="secondary" href={SITE.url} title="Website">
                  <Box direction="horizontal" gap={4} alignItems="center">
                    <HomeIcon
                      width={ICON_SIZE.m}
                      height={ICON_SIZE.m}
                      aria-hidden
                    />
                    <TextHeadline>ajames.dev</TextHeadline>
                  </Box>
                </Link>

                <Link
                  variant="secondary"
                  href={SOCIAL.github.url}
                  title={SOCIAL.github.displayName}
                >
                  <Box direction="horizontal" gap={4} alignItems="center">
                    <GitHubLogoIcon
                      width={ICON_SIZE.m}
                      height={ICON_SIZE.m}
                      aria-hidden
                    />
                    <TextHeadline>phunkren</TextHeadline>
                  </Box>
                </Link>
              </GridRoot>
            </Box>

            <Box as="section" aria-labelledby="education" direction="vertical">
              <TextTitle3 id="education" as="h2">
                Education
              </TextTitle3>

              <Box
                spacingTop={{ "@print": 2, "@initial": 4 }}
                spacingBottom={{ "@print": 4, "@initial": 6 }}
              >
                <Divider />
              </Box>

              <GridRoot
                css={{
                  "@print": { gridRowGap: "$5" },
                  "@bp2": { gridRowGap: "$10" },
                }}
              >
                {EDUCATION.map((education) => (
                  <Box
                    direction="vertical"
                    key={education.id}
                    gap={2}
                    justifyContent="flex-end"
                  >
                    {education.qualification ? (
                      <TextHeadline>{education.qualification}</TextHeadline>
                    ) : null}

                    <TextBody>{education.course}</TextBody>

                    <TextAux color="secondary">{education.institution}</TextAux>

                    <Box>
                      {education.startDate ? (
                        <>
                          <TextAux
                            as="time"
                            color="secondary"
                            dateTime={new Date(
                              education.startDate
                            ).toISOString()}
                          >
                            {new Date(education.startDate).getFullYear()}
                          </TextAux>
                          <TextAux color="secondary">&nbsp;-&nbsp;</TextAux>
                        </>
                      ) : null}

                      {education.endDate ? (
                        <TextAux
                          as="time"
                          color="secondary"
                          dateTime={new Date(education.endDate).toISOString()}
                        >
                          {new Date(education.endDate).getFullYear()}
                        </TextAux>
                      ) : (
                        <TextAux
                          as="time"
                          color="secondary"
                          dateTime={new Date().toISOString()}
                        >
                          Present
                        </TextAux>
                      )}
                    </Box>
                  </Box>
                ))}
              </GridRoot>
            </Box>

            <Box as="section" aria-labelledby="expertise" direction="vertical">
              <TextTitle3 id="expertise" as="h2">
                Expertise
              </TextTitle3>

              <Box
                spacingTop={{ "@print": 2, "@initial": 4 }}
                spacingBottom={{ "@print": 4, "@initial": 6 }}
              >
                <Divider />
              </Box>

              <GridRoot>
                {EXPERTISE.map((topic) => (
                  <GridItem key={topic}>
                    <TextAux color="primary" textTransform="uppercase">
                      {topic}
                    </TextAux>
                  </GridItem>
                ))}
              </GridRoot>
            </Box>

            <Box as="section" aria-labelledby="interests" direction="vertical">
              <TextTitle3 id="interests" as="h2">
                Interests
              </TextTitle3>

              <Box
                spacingTop={{ "@print": 2, "@initial": 4 }}
                spacingBottom={{ "@print": 4, "@initial": 6 }}
              >
                <Divider />
              </Box>

              <GridRoot>
                {INTERESTS.map((interest) => (
                  <GridItem key={interest}>
                    <TextAux color="primary" textTransform="uppercase">
                      {interest}
                    </TextAux>
                  </GridItem>
                ))}
              </GridRoot>
            </Box>

            <Box as="section" aria-labelledby="references" direction="vertical">
              <Link
                variant="secondary"
                href={SOCIAL.linkedin.url}
                title={`${SOCIAL.linkedin.displayName} references`}
              >
                <Box direction="horizontal" gap={4} alignItems="center">
                  <TextTitle3 id="references" as="h2">
                    References
                  </TextTitle3>
                  <LinkedInLogoIcon
                    width={ICON_SIZE.m}
                    height={ICON_SIZE.m}
                    aria-hidden
                  />
                </Box>
              </Link>

              <Box
                spacingTop={{ "@print": 2, "@initial": 4 }}
                spacingBottom={{ "@print": 4, "@initial": 6 }}
              >
                <Divider />
              </Box>

              <Box direction="vertical" spacingBottom={10}>
                <Box as="ul" direction="vertical" gap={10}>
                  {TESTIMONIALS.map((testimonial) => (
                    <Box key={testimonial.id} as="li" direction="vertical">
                      <Box direction="vertical">
                        <StyledBlockQuote cite={SOCIAL.linkedin.url}>
                          <TextAux
                            fontWeight={400}
                            color="secondary"
                            css={{
                              display: "inline",
                              "@print": { display: "none" },
                            }}
                          >
                            {testimonial.quote}
                          </TextAux>

                          <TextAux
                            fontWeight={400}
                            css={{
                              display: "none",
                              "@print": { display: "inline" },
                            }}
                          >
                            {testimonial.excerpt}
                          </TextAux>
                        </StyledBlockQuote>

                        <Box direction="vertical" spacingTop={4}>
                          <Link href={testimonial.url}>
                            <TextHeadline>{testimonial.name}</TextHeadline>
                          </Link>

                          <TextAux>{testimonial.position}</TextAux>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            position={{
              "@print": "static",
              "@initial": "absolute",
              "@bp3": "static",
            }}
            display={{ "@print": "flex", "@initial": "none", "@bp3": "flex" }}
          >
            <Divider orientation="vertical" />
          </Box>

          <Box
            direction="vertical"
            gap={{ "@print": 8, "@initial": 10 }}
            spacingBottom={10}
            flexGrow
          >
            <Box as="section" aria-labelledby="profile" direction="vertical">
              <TextTitle3 id="profile" as="h2">
                Profile
              </TextTitle3>

              <Box
                spacingTop={{ "@print": 2, "@initial": 4 }}
                spacingBottom={{ "@print": 4, "@initial": 6 }}
              >
                <Divider />
              </Box>

              <Box direction="vertical" gap={4}>
                <TextBody textAlign="justify">{PERSONAL.profile1}</TextBody>

                <TextBody textAlign="justify">{PERSONAL.profile2}</TextBody>
              </Box>
            </Box>

            <Box as="section" aria-labelledby="experience" direction="vertical">
              <TextTitle3 id="experience" as="h2">
                Experience
              </TextTitle3>

              <Box
                spacingTop={{ "@print": 2, "@initial": 4 }}
                spacingBottom={{ "@print": 4, "@initial": 6 }}
              >
                <Divider />
              </Box>

              <Box direction="vertical" gap={{ "@print": 6, "@initial": 10 }}>
                {EMPLOYMENT.map((employer) => (
                  <Box direction="vertical" gap={4} key={employer.id}>
                    <Box
                      direction="vertical"
                      gap={{ "@print": 1, "@initial": 2 }}
                    >
                      <TextTitle3>{employer.position}</TextTitle3>

                      <Box
                        direction={{
                          "@print": "horizontal",
                          "@initial": "vertical",
                          "@bp2": "horizontal",
                        }}
                        alignItems={{
                          "@print": "flex-end",
                          "@bp2": "flex-end",
                        }}
                        justifyContent={{
                          "@print": "space-between",
                          "@bp2": "space-between",
                        }}
                        gap={2}
                      >
                        <Box
                          direction="horizontal"
                          gap={2}
                          alignItems="flex-end"
                        >
                          <Link href={employer.url} variant="primary">
                            <TextBody>{employer.displayName}</TextBody>
                          </Link>
                          <TextBody as="span">/</TextBody>
                          <TextBody as="span">{employer.location}</TextBody>
                        </Box>

                        <Box>
                          {employer.startDate ? (
                            <>
                              <TextAux
                                as="time"
                                color="secondary"
                                textTransform={{
                                  "@print": "capitalize",
                                  "@initial": "uppercase",
                                }}
                                fontWeight={400}
                                dateTime={new Date(
                                  employer.startDate
                                ).toISOString()}
                              >
                                {formatLongDate(new Date(employer.startDate))}
                              </TextAux>
                              <TextAux color="secondary">&nbsp;-&nbsp;</TextAux>
                            </>
                          ) : null}

                          {employer.endDate ? (
                            <TextAux
                              as="time"
                              color="secondary"
                              fontWeight={400}
                              textTransform={{
                                "@print": "capitalize",
                                "@initial": "uppercase",
                              }}
                              dateTime={new Date(
                                employer.endDate
                              ).toISOString()}
                            >
                              {formatLongDate(new Date(employer.endDate))}
                            </TextAux>
                          ) : (
                            <TextAux
                              as="time"
                              color="secondary"
                              fontWeight={400}
                              textTransform={{
                                "@print": "capitalize",
                                "@initial": "uppercase",
                              }}
                              dateTime={new Date().toISOString()}
                            >
                              Present
                            </TextAux>
                          )}
                        </Box>
                      </Box>
                    </Box>

                    <TextBody textAlign="justify">{employer.content}</TextBody>

                    {employer.notableWork?.length > 0 ? (
                      <Box direction="vertical" gap={2}>
                        <TextHeadline color="secondary">
                          Notable Contributions
                        </TextHeadline>
                        <Box
                          as="ul"
                          direction={{
                            "@print": "horizontal",
                            "@initial": "vertical",
                          }}
                          spacingHorizontal={10}
                          gap={{
                            "@print": 10,
                            "@initial": 0,
                          }}
                          alignItems={{ "@print": "center" }}
                        >
                          {employer.notableWork.map((work) => (
                            <li key={work.id}>
                              <Link href={work.url} variant="tertiary">
                                <TextBody as="span">
                                  {work.displayName}
                                </TextBody>
                              </Link>
                            </li>
                          ))}
                        </Box>
                      </Box>
                    ) : null}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default About;
