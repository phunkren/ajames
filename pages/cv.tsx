import { blue, gray } from "@radix-ui/colors";
import {
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  HomeIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import * as Separator from "@radix-ui/react-separator";
import { Fragment } from "react";
import { Box, HStack, Layout, VStack } from "../components/Layout";
import { Link } from "../components/Link";
import {
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
      },
      block: {
        display: "block",
      },
    },
  },
});

const GridRoot = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "repeat(6, 1fr)",
  gridColumnGap: "$4",
  gridRowGap: "$4",
});

const GridItem = styled("div", {
  padding: "$2",
  border: "1px solid black",
});

function Cv() {
  return (
    <Layout>
      <HStack justifyContent="center" spacingVertical={5}>
        <TextTitle1>CV</TextTitle1>
      </HStack>

      <HStack
        id="cv"
        gap={5}
        spacing={5}
        css={{ backgroundColor: gray.gray4 }}
        flexWrap={{ "@initial": "wrapReverse", "@bp3": "nowrap" }}
        flexGrow
      >
        <VStack>
          <VStack id="contact" as="section" gap={3}>
            <TextTitle2>Contact</TextTitle2>

            <Box>
              <SeparatorRoot orientation="horizontal" decorative />
            </Box>

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
          </VStack>

          <VStack id="education" as="section" gap={3}>
            <TextTitle2>Education</TextTitle2>

            <Box>
              <SeparatorRoot orientation="horizontal" decorative />
            </Box>

            {EDUCATION.map((education) => (
              <VStack key={education.id}>
                <TextTitle3>{education.qualification}</TextTitle3>
                <TextHeadline>{education.course}</TextHeadline>
                <TextHeadline>{education.institution}</TextHeadline>
                <TextBody>
                  {education.startDate} - {education.endDate}
                </TextBody>
              </VStack>
            ))}
          </VStack>

          <VStack id="expertise" as="section" gap={3}>
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

          <VStack id="interests" as="section" gap={3}>
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

          <VStack id="references" as="section" gap={3}>
            <TextTitle2>References</TextTitle2>

            <Box>
              <SeparatorRoot orientation="horizontal" decorative />
            </Box>

            <TextBody>Written references available upon request.</TextBody>
          </VStack>
        </VStack>

        <Box>
          <SeparatorRoot
            orientation="vertical"
            display={{ "@initial": "none", "@bp3": "block" }}
            decorative
          />
        </Box>

        <VStack>
          <VStack id="profile" as="section" gap={3}>
            <TextTitle2>Profile</TextTitle2>

            <Box>
              <SeparatorRoot orientation="horizontal" decorative />
            </Box>

            <TextBody>
              No man, I don't eat pork Look, just because I don't be givin' no
              man a foot massage don't make it right for Marsellus to throw
              Antwone into a glass motherfuckin' house, fuckin' up the way the
              talks. Motherfucker do that shit to me, he better paralyze my ass,
              'cause I'll kill the motherfucker, know what I'm sayin'?
            </TextBody>

            <TextBody>
              Your bones don't break, mine do. That's clear. Your cells react to
              bacteria and viruses differently than mine. You don't get sick, I
              do. That's also clear. But for some reason, you and I react the
              exact same way to water. We swallow it too fast, we choke. We get
              some in our lungs, we drown. However unreal it may seem, we are
              connected, you and I. We're on the same curve, just on opposite
              ends.
            </TextBody>
          </VStack>

          <VStack id="experience" as="section" gap={3}>
            <TextTitle2>Experience</TextTitle2>

            <Box>
              <SeparatorRoot orientation="horizontal" decorative />
            </Box>

            {EMPLOYMENT.map((employer) => (
              <Fragment key={employer.id}>
                <TextTitle3>{employer.position}</TextTitle3>

                <HStack
                  alignItems="center"
                  justifyContent="space-between"
                  flexWrap="wrap"
                >
                  <HStack gap={2} alignItems="center">
                    <Link href={employer.url} variant="primary">
                      <TextHeadline>{employer.displayName}</TextHeadline>
                    </Link>
                    <TextBody as="span">/</TextBody>
                    <TextBody as="span">{employer.location}</TextBody>
                  </HStack>

                  <Box>
                    <TextBody as="span">
                      {employer.startDate} - {employer.endDate}
                    </TextBody>
                  </Box>
                </HStack>

                <TextBody>
                  Well, the way they make shows is, they make one show. That
                  show's called a pilot. Then they show that show to the people
                  who make shows, and on the strength of that one show they
                  decide if they're going to make more shows. Some pilots get
                  picked and become television programs. Some don't, become
                  nothing. She starred in one of the ones that became nothing.
                </TextBody>
              </Fragment>
            ))}
          </VStack>
        </VStack>
      </HStack>
    </Layout>
  );
}

export default Cv;
