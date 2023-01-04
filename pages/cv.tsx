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
import { Button } from "../components/Button";
import { Box, Layout } from "../components/Layout";
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
import { EXPERTISE } from "../data/expertise";
import { INTERESTS } from "../data/interests";
import { PERSONAL } from "../data/personal";
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
      <Box direction="vertical" css={{ backgroundColor: gray.gray4 }}>
        <Box
          direction="horizontal"
          id="header"
          spacingHorizontal={{ "@initial": 3, "@bp2": 5 }}
          spacingVertical={{ "@initial": 5, "@bp2": 7 }}
          alignItems="flex-end"
          justifyContent="space-between"
          css={{ borderBottom: "5px solid black" }}
        >
          <Box direction="vertical">
            <TextTitle1>Andrew James</TextTitle1>
            <TextHeadline>Frontend Engineer / Glasgow, UK</TextHeadline>
          </Box>

          <Box
            direction="horizontal"
            gap={7}
            display={{ "@initial": "none", "@bp2": "flex" }}
          >
            <Button
              title="Print CV"
              onClick={() => console.log("Implement Print CV")}
            >
              <FileTextIcon width={36} height={36} aria-hidden />
            </Button>

            <Link href="/download-cv" download title="Download CV">
              <DownloadIcon width={36} height={36} aria-hidden />
            </Link>
          </Box>
        </Box>

        <Box
          direction="horizontal"
          id="cv"
          gap={{ "@initial": 5, "@bp2": 7 }}
          spacingHorizontal={{ "@initial": 3, "@bp2": 5 }}
          spacingVertical={{ "@initial": 5, "@bp2": 7 }}
          flexWrap={{ "@initial": "wrapReverse", "@bp3": "nowrap" }}
          flexGrow
        >
          <Box
            direction="vertical"
            gap={5}
            css={{ "@bp3": { flexGrow: 0, flexShrink: 0, flexBasis: 300 } }}
          >
            <Box
              direction="vertical"
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
                  <Box direction="horizontal" gap={2} alignItems="center">
                    <EnvelopeOpenIcon width={18} height={18} aria-hidden />
                    <TextHeadline>contact@ajames.dev</TextHeadline>
                  </Box>
                </Link>

                <Link
                  variant="secondary"
                  href="https://localhost:3000"
                  title="Website"
                >
                  <Box direction="horizontal" gap={2} alignItems="center">
                    <HomeIcon width={18} height={18} aria-hidden />
                    <TextHeadline>ajames.dev</TextHeadline>
                  </Box>
                </Link>

                <Link
                  variant="secondary"
                  href="https://www.linkedin.com/in/ajamesdev/"
                  title="LinkedIn"
                >
                  <Box direction="horizontal" gap={2} alignItems="center">
                    <LinkedInLogoIcon width={18} height={18} aria-hidden />
                    <TextHeadline>Andrew James</TextHeadline>
                  </Box>
                </Link>

                <Link
                  variant="secondary"
                  href="https://github.com/phunkren"
                  title="contact@ajames.dev"
                >
                  <Box direction="horizontal" gap={2} alignItems="center">
                    <GitHubLogoIcon width={18} height={18} aria-hidden />
                    <TextHeadline>phunkren</TextHeadline>
                  </Box>
                </Link>
              </GridRoot>
            </Box>

            <Box
              direction="vertical"
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
                  <Box
                    direction="vertical"
                    key={education.id}
                    gap={1}
                    justifyContent="flex-end"
                  >
                    {education.qualification ? (
                      <TextTitle3>{education.qualification}</TextTitle3>
                    ) : null}
                    <TextHeadline>{education.course}</TextHeadline>
                    <TextHeadline>{education.institution}</TextHeadline>
                    <TextAux>
                      {education.startDate ? `${education.startDate} - ` : null}
                      {education.endDate}
                    </TextAux>
                  </Box>
                ))}
              </GridRoot>
            </Box>

            <Box
              direction="vertical"
              id="expertise"
              as="section"
              gap={{ "@initial": 3, "@bp2": 5 }}
            >
              <TextTitle2>Expertise</TextTitle2>
              <Box>
                <SeparatorRoot orientation="horizontal" decorative />
              </Box>
              <GridRoot>
                {EXPERTISE.map((topic) => (
                  <GridItem key={topic}>{topic}</GridItem>
                ))}
              </GridRoot>
            </Box>

            <Box
              direction="vertical"
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
            </Box>

            <Box
              direction="vertical"
              id="references"
              as="section"
              gap={{ "@initial": 3, "@bp2": 5 }}
            >
              <TextTitle2>References</TextTitle2>

              <Box>
                <SeparatorRoot orientation="horizontal" decorative />
              </Box>

              <Link href="https://www.linkedin.com/in/phunkren/details/recommendations/">
                LinkedIn Recommendations
              </Link>

              <TextBody>
                Written references are also available upon request.
              </TextBody>
            </Box>
          </Box>

          <Box
            position={{ "@initial": "absolute", "@bp3": "static" }}
            display={{ "@initial": "none", "@bp3": "flex" }}
          >
            <SeparatorRoot orientation="vertical" decorative />
          </Box>

          <Box direction="vertical" gap={{ "@initial": 5, "@bp2": 7 }} flexGrow>
            <Box
              direction="vertical"
              id="profile"
              as="section"
              gap={{ "@initial": 3, "@bp2": 5 }}
            >
              <TextTitle2>Profile</TextTitle2>

              <Box>
                <SeparatorRoot orientation="horizontal" decorative />
              </Box>

              <TextBody>{PERSONAL.profile1}</TextBody>
              <TextBody>{PERSONAL.profile2}</TextBody>
            </Box>

            <Box
              direction="vertical"
              id="experience"
              as="section"
              gap={{ "@initial": 3, "@bp2": 5 }}
            >
              <TextTitle2>Experience</TextTitle2>

              <Box>
                <SeparatorRoot orientation="horizontal" decorative />
              </Box>

              <Box direction="vertical" gap={8}>
                {EMPLOYMENT.map((employer) => (
                  <Box
                    direction="vertical"
                    gap={{ "@initial": 2, "@bp2": 4 }}
                    key={employer.id}
                  >
                    <Box
                      direction="vertical"
                      gap={{ "@initial": 1, "@bp2": 2 }}
                    >
                      <TextTitle3>{employer.position}</TextTitle3>

                      <Box
                        direction={{
                          "@initial": "vertical",
                          "@bp2": "horizontal",
                        }}
                        alignItems={{
                          "@bp2": "flex-end",
                        }}
                        justifyContent={{
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
                      gap={{ "@initial": 2, "@bp2": 4 }}
                    >
                      <TextBody>{employer.content1}</TextBody>

                      {employer.content2 ? (
                        <TextBody>{employer.content2}</TextBody>
                      ) : null}

                      {employer.content3 ? (
                        <TextBody>{employer.content3}</TextBody>
                      ) : null}

                      {employer.notableWork?.length > 0 ? (
                        <Box direction="vertical">
                          <TextAux>Notable Work</TextAux>
                          {employer.notableWork.map((work) => (
                            <li key={work.id}>
                              <Link href={work.url}>
                                <TextBody as="span">
                                  {work.displayName}
                                </TextBody>
                              </Link>
                            </li>
                          ))}
                        </Box>
                      ) : null}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default Cv;
