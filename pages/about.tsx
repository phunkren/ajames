import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import {
  DownloadIcon,
  EnvelopeOpenIcon,
  FileTextIcon,
  GitHubLogoIcon,
  HomeIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button, PrintButton } from "../components/Button";
import { Divider } from "../components/Divider";
import { Box, Layout } from "../components/Layout";
import { Link, StyledIconLink } from "../components/Link";
import { Social } from "../components/Social";
import {
  TextAux,
  TextBody,
  TextHeadline,
  TextTitle1,
  TextTitle2,
  TextTitle3,
} from "../components/Text";
import { styled } from "../stitches.config";
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

const StyledPageHeader = styled(Box, {
  display: "block",

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
  borderRadius: 4,
  background: "$background",
});

const GridRoot = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "repeat(auto, 1fr)",
  gridColumnGap: "$4",
  gridRowGap: "$4",

  "@bp2": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  "@bp3": {
    gridTemplateColumns: "1fr",
  },

  "@print": {
    gridTemplateColumns: "1fr",
    gridColumnGap: "$1",
  },
});

const GridItem = styled("div", {
  padding: "$2",
  border: "1px solid black",
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
      <Box spacingTop={{ "@print": 4, "@initial": 4, "@bp2": 7 }}>
        <VisuallyHidden.Root>
          <TextTitle1>About</TextTitle1>
        </VisuallyHidden.Root>

        <Box direction="vertical">
          <StyledPageHeader>
            <AspectRatio ratio={2.84 / 1}>
              <StyledHero
                spacingHorizontal={{ "@initial": 4, "@bp2": 10 }}
                spacingVertical={{ "@initial": 5, "@bp2": 7 }}
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Box direction="vertical">
                  <TextTitle1>{PERSONAL.name}</TextTitle1>
                  <TextHeadline>
                    {PERSONAL.occupation} / {PERSONAL.location}
                  </TextHeadline>
                </Box>

                <Box
                  direction="horizontal"
                  gap={4}
                  display={{
                    "@initial": "none",
                    "@bp2": "flex",
                  }}
                >
                  <PrintButton />

                  <StyledIconLink href="/download-cv" title="Download" download>
                    <DownloadIcon width={18} height={18} aria-hidden />
                  </StyledIconLink>
                </Box>
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

          <Divider />

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
              <Box direction="vertical" id="contact" as="section">
                <TextTitle3>Contact</TextTitle3>

                <Box
                  spacingTop={{ "@print": 1, "@initial": 4 }}
                  spacingBottom={{ "@print": 2, "@initial": 6 }}
                >
                  <Divider />
                </Box>

                <GridRoot>
                  <Link
                    variant="tertiary"
                    href={SOCIAL.linkedin.url}
                    title={SOCIAL.linkedin.displayName}
                  >
                    <Box direction="horizontal" gap={4} alignItems="center">
                      <LinkedInLogoIcon width={18} height={18} aria-hidden />
                      <TextHeadline>Andrew James</TextHeadline>
                    </Box>
                  </Link>

                  <Link
                    variant="tertiary"
                    href="mailto:contact@ajames.dev"
                    title="Email"
                  >
                    <Box direction="horizontal" gap={4} alignItems="center">
                      <EnvelopeOpenIcon width={18} height={18} aria-hidden />
                      <TextHeadline>contact@ajames.dev</TextHeadline>
                    </Box>
                  </Link>

                  <Link
                    variant="tertiary"
                    href={SITE.url}
                    title={SITE.displayName}
                  >
                    <Box direction="horizontal" gap={4} alignItems="center">
                      <HomeIcon width={18} height={18} aria-hidden />
                      <TextHeadline>ajames.dev</TextHeadline>
                    </Box>
                  </Link>

                  <Link
                    variant="tertiary"
                    href={SOCIAL.github.url}
                    title={SOCIAL.github.displayName}
                  >
                    <Box direction="horizontal" gap={4} alignItems="center">
                      <GitHubLogoIcon width={18} height={18} aria-hidden />
                      <TextHeadline>phunkren</TextHeadline>
                    </Box>
                  </Link>
                </GridRoot>
              </Box>

              <Box direction="vertical" id="education" as="section">
                <TextTitle3>Education</TextTitle3>

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
                      <TextAux>{education.institution}</TextAux>
                      <TextAux>
                        {education.startDate
                          ? `${education.startDate} - `
                          : null}
                        {education.endDate}
                      </TextAux>
                    </Box>
                  ))}
                </GridRoot>
              </Box>

              <Box direction="vertical" id="expertise" as="section">
                <TextTitle3>Expertise</TextTitle3>

                <Box
                  spacingTop={{ "@print": 1, "@initial": 4 }}
                  spacingBottom={{ "@print": 2, "@initial": 6 }}
                >
                  <Divider />
                </Box>

                <GridRoot>
                  {EXPERTISE.map((topic) => (
                    <GridItem key={topic}>
                      <TextAux>{topic}</TextAux>
                    </GridItem>
                  ))}
                </GridRoot>
              </Box>

              <Box direction="vertical" id="interests" as="section">
                <TextTitle3>Interests</TextTitle3>

                <Box
                  spacingTop={{ "@print": 1, "@initial": 4 }}
                  spacingBottom={{ "@print": 2, "@initial": 6 }}
                >
                  <Divider />
                </Box>

                <GridRoot>
                  {INTERESTS.map((interest) => (
                    <GridItem key={interest}>
                      <TextAux>{interest}</TextAux>
                    </GridItem>
                  ))}
                </GridRoot>
              </Box>

              <Box direction="vertical" id="references" as="section">
                <TextTitle3>References</TextTitle3>

                <Box
                  spacingTop={{ "@print": 1, "@initial": 4 }}
                  spacingBottom={{ "@print": 2, "@initial": 6 }}
                >
                  <Divider />
                </Box>

                <Box direction="vertical" gap={10}>
                  <Box as="ul" direction="vertical" gap={10} spacingBottom={10}>
                    {TESTIMONIALS.map((testimonial) => (
                      <Box as="li" direction="vertical" key={testimonial.id}>
                        <Box
                          as="blockquote"
                          direction="vertical"
                          cite={SOCIAL.linkedin.url}
                          gap={{ "@print": 3, "@initial": 3, "@bp2": 6 }}
                          css={{
                            fontStyle: "oblique",
                            textAlign: "justify",
                          }}
                        >
                          <TextAux css={{ textTransform: "capitalize" }}>
                            {testimonial.quote1}
                          </TextAux>

                          {testimonial.quote2 ? (
                            <TextAux css={{ textTransform: "capitalize" }}>
                              {testimonial.quote2}
                            </TextAux>
                          ) : null}
                        </Box>

                        <Link
                          variant="secondary"
                          href={testimonial.url}
                          css={{ alignSelf: "flex-end" }}
                        >
                          <TextHeadline css={{ spacingTop: "$4" }}>
                            - {testimonial.name}
                          </TextHeadline>
                        </Link>
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
              gap={{ "@print": 5, "@initial": 10 }}
              flexGrow
            >
              <Box direction="vertical" id="profile" as="section">
                <TextTitle3>Profile</TextTitle3>

                <Box
                  spacingTop={{ "@print": 1, "@initial": 4 }}
                  spacingBottom={{ "@print": 2, "@initial": 6 }}
                >
                  <Divider />
                </Box>

                <Box
                  direction="vertical"
                  gap={{ "@print": 3, "@initial": 3, "@bp2": 6 }}
                >
                  <TextBody>{PERSONAL.profile1}</TextBody>

                  <TextBody>{PERSONAL.profile2}</TextBody>
                </Box>
              </Box>

              <Box direction="vertical" id="experience" as="section">
                <TextTitle3>Experience</TextTitle3>

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
                          gap={1}
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
                            <TextAux as="span">
                              {employer.startDate
                                ? `${employer.startDate} - `
                                : null}
                              {employer.endDate}
                            </TextAux>
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        direction="vertical"
                        gap={{ "@print": 3, "@initial": 3, "@bp2": 6 }}
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
                          gap={{
                            "@print": 0,
                            "@initial": 2,
                          }}
                        >
                          <TextAux>Notable Work</TextAux>
                          <Box
                            as="ul"
                            direction={{
                              "@print": "horizontal",
                              "@initial": "vertical",
                            }}
                            spacingHorizontal={5}
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
    </Layout>
  );
}

export default Cv;
