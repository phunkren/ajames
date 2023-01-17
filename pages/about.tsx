import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import {
  DownloadIcon,
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  HomeIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { PrintButton } from "../components/Button";
import { Divider } from "../components/Divider";
import { ActionButtons, Box, Layout } from "../components/Layout";
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
import Image from "next/image";

const StyledPageHeader = styled(Box, {
  display: "block",
  position: "relative",
  overflow: "hidden",
  borderTopRightRadius: 4,
  borderTopLeftRadius: 4,

  "@print": {
    display: "none",
  },
});

const StyledPrintHeader = styled(Box, {
  display: "none",

  "@print": {
    display: "block",
  },
});

const StyledHero = styled(Box, {
  position: "absolute",
  inset: 0,
  zIndex: 1,
  borderBottomWidth: 5,
  borderBottomStyle: "solid",
  borderBottomColor: "$foreground",

  "&::after": {
    content: "",
    position: "absolute",
    inset: 0,

    [`.${darkTheme} &`]: {
      background: "rgba(0,0,0,0.15)",
    },

    [`.${lightTheme} &`]: {
      background: "$slate11",
      opacity: 0.4,
    },
  },
});

const StyledFilter = styled(Box, {
  position: "absolute",
  inset: 0,
  zIndex: 0,
  filter: "blur(80px)",

  [`.${lightTheme} &`]: {
    background: "conic-gradient(from 50deg, $red11, $red11, $blue10, $blue11)",
  },

  [`.${darkTheme} &`]: {
    background: "conic-gradient(from 50deg, $red3, $red2, $blue2, $blue4)",
  },
});

const StyledImage = styled(Image, {
  display: "none",
  objectFit: "contain",
  borderRadius: 4,
  position: "absolute",
  top: "4% !important",
  left: "16% !important",
  zIndex: 2,
  transform: "scale(0.9)",
  pointerEvents: "none",

  [`.${darkTheme} &`]: {
    filter: "brightness(66%)",
  },

  "@bp2": {
    display: "block",
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

function Cv() {
  return (
    <Layout>
      <Box spacingTop={{ "@print": 4, "@initial": 7, "@bp2": 10 }}>
        <VisuallyHidden.Root>
          <TextTitle1>About</TextTitle1>
        </VisuallyHidden.Root>

        <Box direction="vertical">
          <StyledPageHeader>
            <AspectRatio ratio={2.5 / 1}>
              <StyledImage src={banner} alt="" sizes="100vw" priority fill />

              <StyledFilter />

              <StyledHero
                spacingHorizontal={{ "@initial": 4, "@bp2": 10 }}
                spacingVertical={{ "@initial": 5, "@bp2": 7 }}
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Box direction="vertical" css={{ zIndex: 1 }}>
                  <TextTitle1 css={{ textShadow: "$textShadow" }}>
                    {PERSONAL.name}
                  </TextTitle1>
                  <TextHeadline css={{ textShadow: "$textShadow" }}>
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
              spacingHorizontal={{ "@print": 3 }}
              spacingBottom={{ "@print": 3 }}
              css={{ borderBottom: "2px solid black" }}
            >
              <TextTitle1>{PERSONAL.name}</TextTitle1>
              <TextHeadline>{PERSONAL.occupation} / Glasgow, UK</TextHeadline>
            </Box>
          </StyledPrintHeader>

          <Box
            id="__cv"
            direction="horizontal"
            gap={{ "@print": 4, "@initial": 10 }}
            spacingHorizontal={{ "@print": 3, "@initial": 4, "@bp2": 10 }}
            spacingVertical={{ "@print": 3, "@initial": 10 }}
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
                  spacingTop={{ "@print": 1, "@initial": 4 }}
                  spacingBottom={{ "@print": 2, "@initial": 6 }}
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

              <Box
                as="section"
                aria-labelledby="education"
                direction="vertical"
              >
                <TextTitle3 id="education" as="h2">
                  Education
                </TextTitle3>

                <Box
                  spacingTop={{ "@print": 1, "@initial": 4 }}
                  spacingBottom={{ "@print": 2, "@initial": 6 }}
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
                        <TextTitle3>{education.qualification}</TextTitle3>
                      ) : null}
                      <TextBody>{education.course}</TextBody>
                      <TextAux color="secondary">
                        {education.institution}
                      </TextAux>
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

              <Box
                as="section"
                aria-labelledby="expertise"
                direction="vertical"
              >
                <TextTitle3 id="expertise" as="h2">
                  Expertise
                </TextTitle3>

                <Box
                  spacingTop={{ "@print": 1, "@initial": 4 }}
                  spacingBottom={{ "@print": 2, "@initial": 6 }}
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

              <Box
                as="section"
                direction="vertical"
                aria-labelledby="interests"
              >
                <TextTitle3 id="interests" as="h2">
                  Interests
                </TextTitle3>

                <Box
                  spacingTop={{ "@print": 1, "@initial": 4 }}
                  spacingBottom={{ "@print": 2, "@initial": 6 }}
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

              <Box
                as="section"
                aria-labelledby="references"
                direction="vertical"
              >
                <TextTitle3 id="references" as="h2">
                  References
                </TextTitle3>

                <Box
                  spacingTop={{ "@print": 1, "@initial": 4 }}
                  spacingBottom={{ "@print": 2, "@initial": 6 }}
                >
                  <Divider />
                </Box>

                <Box direction="vertical" gap={10} spacingBottom={10}>
                  <Box
                    as="ul"
                    direction="vertical"
                    gap={{ "@print": 6, "@initial": 10 }}
                  >
                    {TESTIMONIALS.map((testimonial) => (
                      <Box key={testimonial.id} as="li" direction="vertical">
                        <Box direction="vertical">
                          <StyledBlockQuote cite={SOCIAL.linkedin.url}>
                            <TextAux
                              fontWeight={400}
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

                            <TextAux color="secondary">
                              {testimonial.position}
                            </TextAux>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  <Box
                    direction="vertical"
                    gap={10}
                    display={{ "@print": "flex", "@initial": "none" }}
                  >
                    <Link href={SOCIAL.linkedin.url} variant="tertiary">
                      <TextBody>View all references on LinkedIn</TextBody>
                    </Link>

                    <TextBody>
                      Written references are also available upon request
                    </TextBody>
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
              gap={{ "@print": 5, "@initial": 10 }}
              flexGrow
            >
              <Box as="section" aria-labelledby="profile" direction="vertical">
                <TextTitle3 id="profile" as="h2">
                  Profile
                </TextTitle3>

                <Box
                  spacingTop={{ "@print": 1, "@initial": 4 }}
                  spacingBottom={{ "@print": 2, "@initial": 6 }}
                >
                  <Divider />
                </Box>

                <Box
                  direction="vertical"
                  gap={{ "@print": 2, "@initial": 3, "@bp2": 6 }}
                >
                  <TextBody>{PERSONAL.profile1}</TextBody>

                  <TextBody>{PERSONAL.profile2}</TextBody>
                </Box>
              </Box>

              <Box
                as="section"
                aria-labelledby="experience"
                direction="vertical"
              >
                <TextTitle3 id="experience" as="h2">
                  Experience
                </TextTitle3>

                <Box
                  spacingTop={{ "@print": 1, "@initial": 4 }}
                  spacingBottom={{ "@print": 2, "@initial": 6 }}
                >
                  <Divider />
                </Box>

                <Box direction="vertical" gap={{ "@print": 5, "@initial": 10 }}>
                  {EMPLOYMENT.map((employer) => (
                    <Box
                      direction="vertical"
                      gap={{ "@print": 2, "@initial": 3, "@bp2": 6 }}
                      key={employer.id}
                    >
                      <Box direction="vertical" gap={2}>
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
                            gap={{ "@print": 1, "@initial": 2 }}
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
                                  textTransform="uppercase"
                                  fontWeight={400}
                                  dateTime={new Date(
                                    employer.startDate
                                  ).toISOString()}
                                >
                                  {formatLongDate(new Date(employer.startDate))}
                                </TextAux>
                                <TextAux color="secondary">
                                  &nbsp;-&nbsp;
                                </TextAux>
                              </>
                            ) : null}

                            {employer.endDate ? (
                              <TextAux
                                as="time"
                                textTransform="uppercase"
                                color="secondary"
                                fontWeight={400}
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
                                textTransform="uppercase"
                                dateTime={new Date().toISOString()}
                              >
                                Present
                              </TextAux>
                            )}
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        direction="vertical"
                        gap={{ "@print": 2, "@initial": 4, "@bp2": 6 }}
                      >
                        <TextBody>{employer.content1}</TextBody>

                        {employer.content2 ? (
                          <TextBody>{employer.content2}</TextBody>
                        ) : null}

                        {employer.content3 ? (
                          <TextBody>{employer.content3}</TextBody>
                        ) : null}
                      </Box>

                      {employer.notableWork?.length > 0 ? (
                        <Box
                          direction="vertical"
                          spacingTop={2}
                          gap={{
                            "@print": 0,
                            "@initial": 2,
                          }}
                        >
                          <TextHeadline color="secondary">
                            Notable Work
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
                              "@initial": 1,
                            }}
                            alignItems={{ "@print": "center" }}
                          >
                            {employer.notableWork.map((work) => (
                              <li key={work.id}>
                                <Link href={work.url} variant="secondary">
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
    </Layout>
  );
}

export default Cv;
