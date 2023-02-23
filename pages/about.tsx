import { ReactElement } from "react";
import {
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  GlobeIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import { PrintButton } from "../components/Button";
import { Divider } from "../components/Divider";
import { HeroLayout, Layout } from "../components/Layout";
import { DownloadLink, Link } from "../components/Link";
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
import { formatShortDate } from "../util/date";
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
  color: "$foreground",

  "@bp3": {
    left: 0,
    width: "100%",
  },

  "@print": {
    display: "none",
  },
});

const StyledImage = styled(Image, {
  display: "none",
  objectFit: "contain",
  position: "absolute",
  top: "10% !important",
  zIndex: -1,
  transform: "scale(0.9)",
  pointerEvents: "none",

  [`.${lightTheme} &`]: {
    filter: "brightness(85%)",
  },

  [`.${darkTheme} &`]: {
    filter: "brightness(75%)",
    opacity: 0.9,
  },

  "@bp2": {
    display: "block",
    transform: "scale(1)",
    top: "8% !important",
    left: "27% !important",
  },
});

const StyledBlockQuote = styled("blockquote", {
  fontStyle: "oblique",
  textAlign: "justify",
  hyphens: "auto",
  lineHeight: "inherit",
});

const GridRoot = styled("ul", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "repeat(auto, 1fr)",
  gridColumnGap: "$4",
  gridRowGap: "$4",
  listStyleType: "none",

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

const GridItem = styled("li", {
  padding: "$1",
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
          <HeroLayout bordered>
            <Box direction="vertical" position="relative" flexGrow>
              <Box
                direction="vertical"
                spacingLeft={{ "@bp2": 6, "@bp3": 0 }}
                justifyContent={{
                  "@initial": "center",
                  "@bp2": "flex-end",
                  "@bp3": "space-between",
                }}
                flexGrow
              >
                <Box
                  flexGrow
                  direction="vertical"
                  display={{
                    "@initial": "none",
                    "@bp3": "flex",
                  }}
                >
                  <Box gap={4} spacingTop={3}>
                    <PrintButton />
                    <DownloadLink href="../Andrew%20James%20CV.pdf" download />
                  </Box>
                </Box>

                <Box direction="vertical" justifyContent="flex-end">
                  <TextTitle1 css={{ "@bp2": { textShadow: "$textShadow" } }}>
                    {PERSONAL.name}
                  </TextTitle1>

                  <TextHeadline css={{ "@bp2": { textShadow: "$textShadow" } }}>
                    {PERSONAL.occupation} / {PERSONAL.location}
                  </TextHeadline>
                </Box>
              </Box>

              <StyledImage src={banner} alt="" sizes="25vw" priority fill />
            </Box>
          </HeroLayout>
        </StyledPageHeader>

        <StyledPrintHeader>
          <Box
            direction="vertical"
            spacingHorizontal={3}
            spacingBottom={4}
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
          spacingTop={{ "@print": 8, "@initial": 10 }}
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
                spacingTop={2}
                spacingBottom={{ "@print": 4, "@initial": 6 }}
              >
                <Divider />
              </Box>

              <GridRoot>
                <Box as="li" alignItems="center">
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
                </Box>

                <Box as="li" alignItems="center">
                  <Link
                    variant="secondary"
                    href={`mailto:${PERSONAL.email}`}
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
                </Box>

                <Box as="li" alignItems="center">
                  <Link variant="secondary" href={SITE.url} title="Website">
                    <Box direction="horizontal" gap={4} alignItems="center">
                      <GlobeIcon
                        width={ICON_SIZE.m}
                        height={ICON_SIZE.m}
                        aria-hidden
                      />
                      <TextHeadline>ajames.dev</TextHeadline>
                    </Box>
                  </Link>
                </Box>

                <Box as="li" alignItems="center">
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
                </Box>
              </GridRoot>
            </Box>

            <Box as="section" aria-labelledby="expertise" direction="vertical">
              <TextTitle3 id="expertise" as="h2">
                Expertise
              </TextTitle3>

              <Box
                spacingTop={2}
                spacingBottom={{ "@print": 4, "@initial": 6 }}
              >
                <Divider />
              </Box>

              <GridRoot>
                {EXPERTISE.map((topic) => (
                  <GridItem key={topic}>
                    <TextAux
                      color="primary"
                      textTransform={{
                        "@print": "capitalize",
                        "@initial": "uppercase",
                      }}
                    >
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
                spacingTop={2}
                spacingBottom={{ "@print": 4, "@initial": 6 }}
              >
                <Divider />
              </Box>

              <GridRoot>
                {INTERESTS.map((interest) => (
                  <GridItem key={interest}>
                    <TextAux
                      color="primary"
                      textTransform={{
                        "@print": "capitalize",
                        "@initial": "uppercase",
                      }}
                    >
                      {interest}
                    </TextAux>
                  </GridItem>
                ))}
              </GridRoot>
            </Box>

            <Box as="section" aria-labelledby="education" direction="vertical">
              <TextTitle3 id="education" as="h2">
                Education
              </TextTitle3>

              <Box
                spacingTop={2}
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
                    as="li"
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

            <Box as="section" aria-labelledby="references" direction="vertical">
              <Link variant="secondary" href={SOCIAL.linkedin.url}>
                <Box direction="horizontal" gap={2} alignItems="center">
                  <LinkedInLogoIcon
                    width={ICON_SIZE.m}
                    height={ICON_SIZE.m}
                    aria-label="linkedIn logo"
                  />
                  <TextTitle3 id="references" as="h2">
                    References
                  </TextTitle3>
                </Box>
              </Link>

              <Box
                spacingTop={2}
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
                            }}
                          >
                            {testimonial.quote}
                          </TextAux>
                        </StyledBlockQuote>

                        <Box direction="vertical" spacingTop={4}>
                          <TextHeadline>{testimonial.name}</TextHeadline>

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
                spacingTop={2}
                spacingBottom={{ "@print": 4, "@initial": 6 }}
              >
                <Divider />
              </Box>

              <Box direction="vertical" gap={4}>
                <TextBody textAlign="justify" color="secondary">
                  {PERSONAL.profile1}
                </TextBody>

                <TextBody textAlign="justify" color="secondary">
                  {PERSONAL.profile2}
                </TextBody>
              </Box>
            </Box>

            <Box as="section" aria-labelledby="experience" direction="vertical">
              <TextTitle3 id="experience" as="h2">
                Experience
              </TextTitle3>

              <Box
                spacingTop={2}
                spacingBottom={{ "@print": 4, "@initial": 6 }}
              >
                <Divider />
              </Box>

              <Box direction="vertical" gap={10}>
                {EMPLOYMENT.map((employer) => (
                  <Box
                    direction="vertical"
                    gap={4}
                    key={employer.id}
                    spacingBottom={1}
                  >
                    <Box direction="vertical">
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
                        gap={1}
                      >
                        <Box
                          direction="horizontal"
                          gap={2}
                          alignItems="flex-end"
                        >
                          <Link href={employer.url} variant="primary">
                            <TextHeadline>{employer.displayName}</TextHeadline>
                          </Link>
                          <TextBody as="span" color="secondary">
                            /
                          </TextBody>
                          <TextBody as="span" color="secondary">
                            {employer.location}
                          </TextBody>
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
                                dateTime={new Date(
                                  employer.startDate
                                ).toISOString()}
                                css={{ lineHeight: "inherit" }}
                              >
                                {formatShortDate(new Date(employer.startDate))}
                              </TextAux>
                              <TextAux
                                color="secondary"
                                css={{ lineHeight: "inherit" }}
                              >
                                &nbsp;-&nbsp;
                              </TextAux>
                            </>
                          ) : null}

                          {employer.endDate ? (
                            <TextAux
                              as="time"
                              color="secondary"
                              textTransform={{
                                "@print": "capitalize",
                                "@initial": "uppercase",
                              }}
                              dateTime={new Date(
                                employer.endDate
                              ).toISOString()}
                              css={{ lineHeight: "inherit" }}
                            >
                              {formatShortDate(new Date(employer.endDate))}
                            </TextAux>
                          ) : (
                            <TextAux
                              as="time"
                              color="secondary"
                              textTransform={{
                                "@print": "capitalize",
                                "@initial": "uppercase",
                              }}
                              dateTime={new Date().toISOString()}
                              css={{ lineHeight: "inherit" }}
                            >
                              Present
                            </TextAux>
                          )}
                        </Box>
                      </Box>
                    </Box>

                    <TextBody textAlign="justify" color="secondary">
                      {employer.content}
                    </TextBody>

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
                          spacingHorizontal={{ "@print": 5, "@initial": 10 }}
                          gap={{
                            "@print": 10,
                            "@initial": 0,
                          }}
                          alignItems={{ "@print": "center" }}
                        >
                          {employer.notableWork.map((work) => (
                            <li key={work.id}>
                              <Link href={work.url} variant="tertiary">
                                <TextHeadline>{work.displayName}</TextHeadline>
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
