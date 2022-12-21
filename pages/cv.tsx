import { blue, gray } from "@radix-ui/colors";
import {
  DownloadIcon,
  EnvelopeOpenIcon,
  FileTextIcon,
  GitHubLogoIcon,
  HomeIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import * as Separator from "@radix-ui/react-separator";
import { Fragment } from "react";
import { Button } from "../components/Button";
import { Box, HStack, Layout, VStack } from "../components/Layout";
import { Link } from "../components/Link";
import {
  TextAux,
  TextBody,
  TextHeadline,
  TextTitle1,
  TextTitle2,
  TextTitle3,
} from "../components/Text";
import { EDUCATION } from "../data/education";
import { EMPLOYMENT } from "../data/employment";
import { INTERESTS } from "../data/interests";
import { styled } from "../stitches.config";

const SeparatorRoot = styled(Separator.Root, {
  backgroundColor: blue.blue12,
  "&[data-orientation=horizontal]": { height: 1, width: "100%" },
  "&[data-orientation=vertical]": { height: "100%", width: 1 },

  "@bp3": {
    display: "block",
  },

  variants: {
    display: {
      none: {
        display: "none",
        position: "absolute",
      },
      block: {
        display: "block",
        position: "static",
      },
    },
  },
});

const GridRoot = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "repeat(auto, 1fr)",
  gridColumnGap: "$3",
  gridRowGap: "$2",

  "@bp2": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  "@bp3": {
    gridTemplateColumns: "1fr",
  },
});

const GridItem = styled("div", {
  padding: "$2",
  border: "1px solid black",
});

function Cv() {
  return (
    <Layout>
      <VStack css={{ backgroundColor: gray.gray4 }}>
        <HStack
          id="header"
          spacingHorizontal={{ "@initial": 3, "@bp2": 5 }}
          spacingVertical={{ "@initial": 5, "@bp2": 7 }}
          alignItems="flex-end"
          justifyContent="space-between"
          css={{ borderBottom: "5px solid black" }}
        >
          <VStack>
            <TextTitle1>Andrew James</TextTitle1>
            <TextHeadline>Frontend Engineer / Glasgow, UK</TextHeadline>
          </VStack>

          <HStack gap={7} display={{ "@initial": "none", "@bp2": "flex" }}>
            <Button
              title="Print CV"
              onClick={() => console.log("Implement Print CV")}
            >
              <FileTextIcon width={36} height={36} aria-hidden />
            </Button>

            <Link href="/download-cv" download title="Download CV">
              <DownloadIcon width={36} height={36} aria-hidden />
            </Link>
          </HStack>
        </HStack>

        <HStack
          id="cv"
          gap={{ "@initial": 5, "@bp2": 7 }}
          spacingHorizontal={{ "@initial": 3, "@bp2": 5 }}
          spacingVertical={{ "@initial": 5, "@bp2": 7 }}
          flexWrap={{ "@initial": "wrapReverse", "@bp3": "nowrap" }}
          flexGrow
        >
          <VStack
            gap={5}
            css={{ "@bp3": { flexGrow: 0, flexShrink: 0, flexBasis: 300 } }}
          >
            <VStack
              id="contact"
              as="section"
              gap={{ "@initial": 3, "@bp2": 5 }}
            >
              <TextTitle2>Contact</TextTitle2>

              <Box>
                <SeparatorRoot orientation="horizontal" decorative />
              </Box>

              <GridRoot>
                <Link
                  variant="secondary"
                  href="mailto:contact@ajames.dev"
                  title="Email"
                >
                  <HStack gap={2} alignItems="center">
                    <EnvelopeOpenIcon width={18} height={18} aria-hidden />
                    <TextHeadline>contact@ajames.dev</TextHeadline>
                  </HStack>
                </Link>

                <Link
                  variant="secondary"
                  href="https://localhost:3000"
                  title="Website"
                >
                  <HStack gap={2} alignItems="center">
                    <HomeIcon width={18} height={18} aria-hidden />
                    <TextHeadline>ajames.dev</TextHeadline>
                  </HStack>
                </Link>

                <Link
                  variant="secondary"
                  href="https://www.linkedin.com/in/ajamesdev/"
                  title="LinkedIn"
                >
                  <HStack gap={2} alignItems="center">
                    <LinkedInLogoIcon width={18} height={18} aria-hidden />
                    <TextHeadline>Andrew James</TextHeadline>
                  </HStack>
                </Link>

                <Link
                  variant="secondary"
                  href="https://github.com/phunkren"
                  title="contact@ajames.dev"
                >
                  <HStack gap={2} alignItems="center">
                    <GitHubLogoIcon width={18} height={18} aria-hidden />
                    <TextHeadline>phunkren</TextHeadline>
                  </HStack>
                </Link>
              </GridRoot>
            </VStack>

            <VStack
              id="education"
              as="section"
              gap={{ "@initial": 3, "@bp2": 5 }}
            >
              <TextTitle2>Education</TextTitle2>

              <Box>
                <SeparatorRoot orientation="horizontal" decorative />
              </Box>

              <GridRoot css={{ "@bp2": { gridRowGap: "$5" } }}>
                {EDUCATION.map((education) => (
                  <VStack key={education.id} gap={1} justifyContent="flex-end">
                    {education.qualification ? (
                      <TextTitle3>{education.qualification}</TextTitle3>
                    ) : null}
                    <TextHeadline>{education.course}</TextHeadline>
                    <TextHeadline>{education.institution}</TextHeadline>
                    <TextAux>
                      {education.startDate} - {education.endDate}
                    </TextAux>
                  </VStack>
                ))}
              </GridRoot>
            </VStack>

            <VStack
              id="expertise"
              as="section"
              gap={{ "@initial": 3, "@bp2": 5 }}
            >
              <TextTitle2>Expertise</TextTitle2>
              <Box>
                <SeparatorRoot orientation="horizontal" decorative />
              </Box>
              <GridRoot>
                {INTERESTS.map((interest) => (
                  <GridItem key={interest}>{interest}</GridItem>
                ))}
              </GridRoot>
            </VStack>

            <VStack
              id="interests"
              as="section"
              gap={{ "@initial": 3, "@bp2": 5 }}
            >
              <TextTitle2>Interests</TextTitle2>

              <Box>
                <SeparatorRoot orientation="horizontal" decorative />
              </Box>

              <GridRoot>
                {INTERESTS.map((interest) => (
                  <GridItem key={interest}>{interest}</GridItem>
                ))}
              </GridRoot>
            </VStack>

            <VStack
              id="references"
              as="section"
              gap={{ "@initial": 3, "@bp2": 5 }}
            >
              <TextTitle2>References</TextTitle2>

              <Box>
                <SeparatorRoot orientation="horizontal" decorative />
              </Box>

              <TextBody>Written references available upon request.</TextBody>
            </VStack>
          </VStack>

          <Box
            position={{ "@initial": "absolute", "@bp3": "static" }}
            display={{ "@initial": "none", "@bp3": "flex" }}
          >
            <SeparatorRoot orientation="vertical" decorative />
          </Box>

          <VStack gap={{ "@initial": 5, "@bp2": 7 }} flexGrow>
            <VStack
              id="profile"
              as="section"
              gap={{ "@initial": 3, "@bp2": 5 }}
            >
              <TextTitle2>Profile</TextTitle2>

              <Box>
                <SeparatorRoot orientation="horizontal" decorative />
              </Box>

              <TextBody>
                No man, I don't eat pork Look, just because I don't be givin' no
                man a foot massage don't make it right for Marsellus to throw
                Antwone into a glass motherfuckin' house, fuckin' up the way the
                talks. Motherfucker do that shit to me, he better paralyze my
                ass, 'cause I'll kill the motherfucker, know what I'm sayin'?
              </TextBody>

              <TextBody>
                Your bones don't break, mine do. That's clear. Your cells react
                to bacteria and viruses differently than mine. You don't get
                sick, I do. That's also clear. But for some reason, you and I
                react the exact same way to water. We swallow it too fast, we
                choke. We get some in our lungs, we drown. However unreal it may
                seem, we are connected, you and I. We're on the same curve, just
                on opposite ends.
              </TextBody>
            </VStack>

            <VStack
              id="experience"
              as="section"
              gap={{ "@initial": 3, "@bp2": 5 }}
            >
              <TextTitle2>Experience</TextTitle2>

              <Box>
                <SeparatorRoot orientation="horizontal" decorative />
              </Box>

              {EMPLOYMENT.map((employer) => (
                <VStack gap={{ "@initial": 2, "@bp2": 4 }} key={employer.id}>
                  <VStack gap={{ "@initial": 1, "@bp2": 2 }}>
                    <TextTitle3>{employer.position}</TextTitle3>

                    <HStack
                      alignItems="center"
                      justifyContent="space-between"
                      flexWrap="wrap"
                      gap={{ "@initial": 1, "@bp2": 2 }}
                    >
                      <HStack gap={2} alignItems="flex-end">
                        <Link href={employer.url} variant="primary">
                          <TextBody>{employer.displayName}</TextBody>
                        </Link>
                        <TextBody as="span">/</TextBody>
                        <TextBody as="span">{employer.location}</TextBody>
                      </HStack>

                      <Box>
                        <TextAux as="span">
                          {employer.startDate} - {employer.endDate}
                        </TextAux>
                      </Box>
                    </HStack>
                  </VStack>

                  <VStack gap={{ "@initial": 2, "@bp2": 4 }}>
                    <TextBody>{employer.content1}</TextBody>

                    {employer.content2 ? (
                      <TextBody>{employer.content2}</TextBody>
                    ) : null}

                    {employer.content3 ? (
                      <TextBody>{employer.content3}</TextBody>
                    ) : null}
                  </VStack>
                </VStack>
              ))}
            </VStack>
          </VStack>
        </HStack>
      </VStack>
    </Layout>
  );
}

export default Cv;
