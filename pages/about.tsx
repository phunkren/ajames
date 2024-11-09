import { Box } from "../components/Box";
import { Layout } from "../components/Layout";
import { NextPageWithLayout } from "./_app";
import { formatISO } from "date-fns";
import { memo, ReactNode, ReactElement, useCallback, useRef } from "react";
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
import { formatShortDate } from "../util/date";
import { ICON_SIZE } from "../util/images";
import {
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  GlobeIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { CollapsibleButton, PrintButton } from "../components/Button";
import { Divider } from "../components/Divider";
import { DownloadLink, Link, LinkedInConnectLink } from "../components/Link";
import {
  TextAux,
  TextBody,
  TextHeadline,
  TextTitle1,
  TextTitle2,
  TextTitle3,
} from "../components/Text";
import { Tooltip } from "../components/Tooltip";
import {
  Frontmatter,
  Location,
  Name,
  Occupation,
} from "../components/Frontmatter";
import { ActionButtons } from "../components/Layout";
import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
} from "../components/Collapsible";

type CollapsibleSectionProps = {
  title: string;
  children: ReactNode;
};

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

const GridItem = styled("li", {
  padding: "$1",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "$foregroundMuted",
  textAlign: "center",
  borderRadius: "$1",

  "@print": {
    padding: 0,
    marginLeft: "$4",
    border: "none",
    textAlign: "left",
    lineHeight: 1,
  },
});

export const CollapsibleSection = memo(function CollapsibleSection({
  title,
  children,
}: CollapsibleSectionProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    buttonRef.current.click();
  }, []);

  return (
    <>
      <Box
        display={{ "@initial": "flex", "@bp2": "none", "@print": "none" }}
        direction="vertical"
      >
        <CollapsibleRoot>
          <Box as="section" direction="vertical">
            <Box
              justifyContent="space-between"
              alignItems="center"
              gap={4}
              tabIndex={-1}
              onClick={handleClick}
            >
              <TextTitle3 as="h2">{title}</TextTitle3>

              <CollapsibleTrigger asChild>
                <CollapsibleButton ref={buttonRef} />
              </CollapsibleTrigger>
            </Box>

            <Box spacingTop={2} spacingBottom={8}>
              <Divider />
            </Box>

            <Box direction="vertical">
              <CollapsibleContent asChild>{children}</CollapsibleContent>
            </Box>
          </Box>
        </CollapsibleRoot>
      </Box>

      <Box
        as="section"
        direction="vertical"
        display={{ "@initial": "none", "@bp2": "flex", "@print": "flex" }}
      >
        <Box justifyContent="space-between" alignItems="center" gap={2}>
          <TextTitle2>{title}</TextTitle2>
        </Box>

        <Box
          spacingTop={2}
          spacingBottom={{ "@initial": 11, "@bp2": 8, "@print": 4 }}
        >
          <Divider />
        </Box>

        <Box direction="vertical">{children}</Box>
      </Box>
    </>
  );
});

export const ABOOT_ID = "about";

const About: NextPageWithLayout = memo(function About() {
  // Remove ms, s, and min in today's date to prevent ssr hydrastion errors
  const currentDate = formatISO(new Date(), { representation: "date" });
  const presentDate = new Date(currentDate).toISOString();

  return (
    <Box as="section" display="flex" direction="vertical">
      <Box direction="vertical" gap={12} container="l" css={{ zIndex: "$1" }}>
        <Box direction="vertical" gap={10}>
          <Box
            as="section"
            spacingHorizontal={{ "@initial": 7, "@print": 0 }}
            direction="vertical"
            css={{
              "@print": { overflowY: "hidden" },
            }}
          >
            <Box
              direction="vertical"
              gap={{ "@initial": 11, "@print": 0 }}
              container="l"
              css={{ zIndex: "$1" }}
            >
              <Box
                direction="vertical"
                spacingBottom={8}
                display={{ "@initial": "none", "@print": "flex" }}
              >
                <Box
                  direction="vertical"
                  spacingHorizontal={3}
                  spacingBottom={6}
                  css={{ borderBottom: "2px solid black" }}
                >
                  <TextTitle1>{PERSONAL.name}</TextTitle1>
                  <TextHeadline>
                    {PERSONAL.occupation} / {PERSONAL.location}
                  </TextHeadline>
                </Box>
              </Box>

              <Box
                direction="vertical"
                display={{ "@initial": "flex", "@print": "none" }}
              >
                <Box
                  id={ABOOT_ID}
                  justifyContent="space-between"
                  alignItems="baseline"
                  spacingTop={12}
                  spacingBottom={{ "@initial": 4, "@bp2": 10 }}
                >
                  <TextTitle1 as="h2">About</TextTitle1>

                  <Box
                    position="relative"
                    css={{
                      display: "none",
                      "@bp2": { display: "flex", left: "-$1" },
                    }}
                  >
                    <LinkedInConnectLink type="button" />
                  </Box>

                  <LinkedInConnectLink
                    type="icon"
                    css={{
                      display: "flex",
                      "@bp2": {
                        display: "none",
                      },
                    }}
                  />
                </Box>

                <Box
                  justifyContent="space-between"
                  alignItems="flex-end"
                  gap={4}
                >
                  <Frontmatter flexGrow>
                    <Name icon />
                    <Occupation icon />
                    <Location icon />
                  </Frontmatter>

                  <ActionButtons css={{ flexBasis: "fit-content" }}>
                    <PrintButton />
                    <DownloadLink href="../Andrew%20James%20CV.pdf" download />
                  </ActionButtons>
                </Box>

                <Box
                  display={{ "@initial": "none", "@bp3": "flex" }}
                  spacingTop={10}
                >
                  <Divider />
                </Box>
              </Box>

              <Box
                id="__cv"
                direction="horizontal"
                gap={{ "@initial": 0, "@bp2": 10, "@print": 4 }}
                spacingTop={{ "@initial": 0, "@print": 3 }}
                spacingHorizontal={{ "@initial": 0, "@print": 3 }}
                flexWrap={{
                  "@initial": "wrapReverse",
                  "@bp3": "nowrap",
                  "@print": "nowrap",
                }}
                flexGrow
              >
                <Box
                  direction="vertical"
                  gap={{ "@initial": 0, "@bp2": 10, "@bp3": 11, "@print": 4 }}
                  css={{
                    "@bp3": { flexGrow: 0, flexShrink: 0, flexBasis: 250 },
                    "@print": { flexGrow: 0, flexShrink: 0, flexBasis: 125 },
                  }}
                >
                  <CollapsibleSection title="Contact">
                    <GridRoot>
                      <Box as="li" alignItems="center">
                        <Tooltip title={SOCIAL.linkedin.displayName}>
                          <Link variant="secondary" href={SOCIAL.linkedin.url}>
                            <Box
                              direction="horizontal"
                              gap={{ "@initial": 6, "@print": 4 }}
                              alignItems="center"
                            >
                              <LinkedInLogoIcon
                                width={ICON_SIZE.l}
                                height={ICON_SIZE.l}
                                aria-hidden
                              />
                              <TextHeadline>Andrew James</TextHeadline>
                            </Box>
                          </Link>
                        </Tooltip>
                      </Box>

                      <Box as="li" alignItems="center">
                        <Tooltip title={SOCIAL.email.displayName}>
                          <Link variant="secondary" href={SOCIAL.email.url}>
                            <Box
                              direction="horizontal"
                              gap={{ "@initial": 6, "@print": 4 }}
                              alignItems="center"
                            >
                              <EnvelopeOpenIcon
                                width={ICON_SIZE.l}
                                height={ICON_SIZE.l}
                                aria-hidden
                              />
                              <TextHeadline>{SOCIAL.email.handle}</TextHeadline>
                            </Box>
                          </Link>
                        </Tooltip>
                      </Box>

                      <Box as="li" alignItems="center">
                        <Tooltip title="Website">
                          <Link variant="secondary" href={SITE.url}>
                            <Box
                              direction="horizontal"
                              gap={{ "@initial": 6, "@print": 4 }}
                              alignItems="center"
                            >
                              <GlobeIcon
                                width={ICON_SIZE.l}
                                height={ICON_SIZE.l}
                                aria-hidden
                              />
                              <TextHeadline>ajames.dev</TextHeadline>
                            </Box>
                          </Link>
                        </Tooltip>
                      </Box>

                      <Box as="li" alignItems="center">
                        <Tooltip title={SOCIAL.github.displayName}>
                          <Link variant="secondary" href={SOCIAL.github.url}>
                            <Box
                              direction="horizontal"
                              gap={{ "@initial": 6, "@print": 4 }}
                              alignItems="center"
                            >
                              <GitHubLogoIcon
                                width={ICON_SIZE.l}
                                height={ICON_SIZE.l}
                                aria-hidden
                              />
                              <TextHeadline>phunkren</TextHeadline>
                            </Box>
                          </Link>
                        </Tooltip>
                      </Box>
                    </GridRoot>
                  </CollapsibleSection>

                  <CollapsibleSection title="Expertise">
                    <GridRoot>
                      {EXPERTISE.map((topic) => (
                        <GridItem key={topic}>
                          <TextAux
                            color="primary"
                            textTransform={{
                              "@initial": "uppercase",
                              "@print": "capitalize",
                            }}
                          >
                            {topic}
                          </TextAux>
                        </GridItem>
                      ))}
                    </GridRoot>
                  </CollapsibleSection>

                  <CollapsibleSection title="Interests">
                    <GridRoot>
                      {INTERESTS.map((interest) => (
                        <GridItem key={interest}>
                          <TextAux
                            color="primary"
                            textTransform={{
                              "@initial": "uppercase",
                              "@print": "capitalize",
                            }}
                          >
                            {interest}
                          </TextAux>
                        </GridItem>
                      ))}
                    </GridRoot>
                  </CollapsibleSection>

                  <CollapsibleSection title="Education">
                    <GridRoot
                      css={{
                        "@initial": { gridRowGap: "$10" },
                        "@bp2": { gridRowGap: "$10" },
                        "@print": { gridRowGap: "$5" },
                      }}
                    >
                      {EDUCATION.map((education, i) => (
                        <Box
                          as="li"
                          direction="vertical"
                          key={education.id}
                          gap={2}
                          justifyContent="flex-end"
                          css={{
                            paddingBottom: i === 0 ? "$2" : 0,
                            "@bp2": { paddingBottom: 0 },
                          }}
                        >
                          {education.qualification ? (
                            <TextHeadline>
                              {education.qualification}
                            </TextHeadline>
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
                                <TextAux color="secondary">
                                  &nbsp;-&nbsp;
                                </TextAux>
                              </>
                            ) : null}

                            {education.endDate ? (
                              <TextAux
                                as="time"
                                color="secondary"
                                dateTime={new Date(
                                  education.endDate
                                ).toISOString()}
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
                  </CollapsibleSection>

                  <CollapsibleSection title="References">
                    <Box direction="vertical">
                      <Box as="ul" direction="vertical" gap={10}>
                        {TESTIMONIALS.map((testimonial) => (
                          <Box
                            key={testimonial.id}
                            as="li"
                            direction="vertical"
                          >
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
                  </CollapsibleSection>
                </Box>

                <Box
                  position={{
                    "@initial": "absolute",
                    "@bp3": "static",
                    "@print": "static",
                  }}
                  display={{
                    "@initial": "none",
                    "@bp3": "flex",
                    "@print": "flex",
                  }}
                >
                  <Divider orientation="vertical" />
                </Box>

                <Box
                  direction="vertical"
                  gap={{ "@initial": 10, "@bp2": 11, "@print": 8 }}
                  spacingBottom={{ "@initial": 0, "@bp3": 10, "@print": 3 }}
                  flexGrow
                >
                  <Box as="section" direction="vertical">
                    <TextTitle2>Profile</TextTitle2>

                    <Box
                      spacingTop={2}
                      spacingBottom={{ "@initial": 8, "@print": 4 }}
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

                  <CollapsibleSection title="Experience">
                    <Box
                      direction="vertical"
                      gap={{ "@initial": 11, "@print": 6 }}
                    >
                      {EMPLOYMENT.map((employer) => (
                        <Box
                          direction="vertical"
                          gap={4}
                          key={employer.id}
                          spacingBottom={2}
                        >
                          <Box direction="vertical">
                            <TextTitle3>{employer.position}</TextTitle3>

                            <Box
                              direction={{
                                "@initial": "vertical",
                                "@bp2": "horizontal",
                                "@print": "horizontal",
                              }}
                              alignItems={{
                                "@bp2": "flex-end",
                                "@print": "flex-end",
                              }}
                              justifyContent={{
                                "@bp2": "space-between",
                                "@print": "space-between",
                              }}
                            >
                              <Box
                                direction="horizontal"
                                gap={2}
                                alignItems="flex-end"
                              >
                                <Link href={employer.url} variant="primary">
                                  <TextHeadline>
                                    {employer.displayName}
                                  </TextHeadline>
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
                                        "@initial": "uppercase",
                                        "@print": "capitalize",
                                      }}
                                      dateTime={new Date(
                                        employer.startDate
                                      ).toISOString()}
                                      css={{ lineHeight: "inherit" }}
                                    >
                                      {formatShortDate(
                                        new Date(employer.startDate)
                                      )}
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
                                      "@initial": "uppercase",
                                      "@print": "capitalize",
                                    }}
                                    dateTime={new Date(
                                      employer.endDate
                                    ).toISOString()}
                                    css={{ lineHeight: "inherit" }}
                                  >
                                    {formatShortDate(
                                      new Date(employer.endDate)
                                    )}
                                  </TextAux>
                                ) : (
                                  <TextAux
                                    as="time"
                                    color="secondary"
                                    textTransform={{
                                      "@initial": "uppercase",
                                      "@print": "capitalize",
                                    }}
                                    dateTime={presentDate}
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
                            <Box direction="vertical" gap={1}>
                              <TextHeadline color="secondary">
                                Notable Contributions
                              </TextHeadline>
                              <Box
                                as="ul"
                                direction={{
                                  "@initial": "vertical",
                                  "@print": "horizontal",
                                }}
                                spacingHorizontal={{
                                  "@initial": 10,
                                  "@print": 5,
                                }}
                                gap={{
                                  "@initial": 1,
                                  "@print": 10,
                                }}
                                alignItems={{ "@print": "center" }}
                              >
                                {employer.notableWork.map((work) => (
                                  <li key={work.id}>
                                    <Link href={work.url} variant="tertiary">
                                      <TextHeadline>
                                        {work.displayName}
                                      </TextHeadline>
                                    </Link>
                                  </li>
                                ))}
                              </Box>
                            </Box>
                          ) : null}
                        </Box>
                      ))}
                    </Box>
                  </CollapsibleSection>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default About;
