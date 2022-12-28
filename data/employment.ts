type NoteableWork = {
  id: string;
  displayName: string;
  url?: string;
};

type Employer = {
  id: string;
  displayName: string;
  url: string;
  position: string;
  startDate?: string;
  endDate: string;
  location: string;
  content1: string;
  content2?: string;
  content3?: string;
  notableWork?: NoteableWork[];
};

export const EMPLOYMENT: Employer[] = [
  {
    id: "coinbase",
    displayName: "Coinbase",
    url: "https://www.coinbase.com/",
    position: "IC4 Engineer",
    startDate: "Mar 22",
    endDate: "Present",
    location: "Remote, EMEA",
    content1:
      "I'm curently working on Coinbase Prime with team members from various disciplines to create intuitive and trustworthy user experiences for institutional customers. I primarily focus on efficiently executing and maintaining frontend features on the platform and admin interface.",
    content2:
      "I was also recently part of a team that developed and successfully launched the Data Marketplace. This gave me the opportunity to lead the UI development for the inital launch of a product that provides a collection of historical datasets from the Coinbase Exchange.",
    notableWork: [
      {
        id: "insto-prime",
        displayName: "Coinbase Prime",
        url: "https://www.coinbase.com/prime",
      },
      {
        id: "data-marketplace",
        displayName: "Data Marketplace",
        url: "https://data.coinbase.com/",
      },
    ],
  },
  {
    id: "rockstar-web",
    displayName: "Rockstar Games",
    url: "https://www.rockstargames.com/",
    position: "Frontend Engineer",
    startDate: "Nov 20",
    endDate: "Feb 22",
    location: "Edinburgh, UK",
    content1:
      "I worked with other technology teams at Rockstar's worldwide studios to develop frontend features and applications for the company's online services. Responsibilities were to deliver feature-flagged content under time-sensitive release cycles, and maintain legacy architecture.",
    content2:
      "Key achievements at Rockstar involved working with other engineers to update the Social Club to meet AA accessibility standards, and developing the foundations of an accessible design system that could be used across all Rockstar-branded websites.",
    notableWork: [
      {
        id: "social-club",
        displayName: "Social Club",
        url: "https://socialclub.rockstargames.com/",
      },
      {
        id: "game-launcher",
        displayName: "Rockstar Games Launcher",
        url: "https://www.rockstargames.com/newswire/article/o349k5525o9483/The-Rockstar-Games-Launcher",
      },
    ],
  },
  {
    id: "bcgdv",
    displayName: "BCG Digital Venues",
    url: "https://www.bcgdv.com/",
    position: "Senior Frontend Engineer",
    startDate: "Apr 19",
    endDate: "Oct 20",
    location: "London, UK",
    content1:
      "I played a key role in the development and launch of several successful startup businesses. At BCG I was responsible for leading a small engineering team through scoped deliverables, collaborating with cross-functional teams, and engineering a robust and well-documented product that could be taken to market.",
    content2:
      "I also participated in the Code First Girls program, which aims to reduce the gender diversity gap by giving women the opportunity to pursue a career in tech. Mentoring  allowed me to directly contribute to the community by supporting the growth and development of future engineers.",
    notableWork: [
      {
        id: "vanguard",
        displayName: "Vanguard Digital Advisor",
        url: "https://investor.vanguard.com/advice/digital-advisor",
      },
      {
        id: "beema",
        displayName: "Beema",
        url: "https://www.beema.ae/en",
      },
    ],
  },
  {
    id: "fathom",
    displayName: "Fathom London",
    url: "https://fath.om/",
    position: "Frontend Engineer",
    startDate: "Jun 17",
    endDate: "Mar 19",
    location: "London, UK",
    content1:
      "During my time at Fathom, I had the opportunity to work on exciting data visualization and trading platform projects for fintech clients and major banks. I was also involved in creating a React Native prototype for an international business planning software company, bringing their desktop offerings to mobile.",
    content2:
      "In addition to client projects, I had the opportunity to contribute to the redesign of the company's website and participate in various internal events such as hackathons, live streams, and technical presentations. These experiences allowed me to not only stay up to date with the latest technologies and practices, but also to share my knowledge and insights with my colleagues.",
    notableWork: [
      {
        id: "access-fintech",
        displayName: "Access Fintech",
        url: "https://www.accessfintech.com/",
      },
      {
        id: "anaplan",
        displayName: "Anaplan",
        url: "https://help.anaplan.com/0f66645c-06a5-49f8-8660-8993653f8974",
      },
      {
        id: "fathom",
        displayName: "Fathom",
        url: "https://fath.om/",
      },
    ],
  },
  {
    id: "cohaeseus",
    displayName: "Cohaesus",
    url: "https://cohaesus.co.uk/",
    position: "Associate Engineer",
    startDate: "Feb 15",
    endDate: "Jun 17",
    location: "London, UK",
    content1:
      "Cohaesus is a commercial advertising agency where I had the opportunity to learn the fundamentals of frontend web development while working on a variety of projects, both in-house and at some of the top advertising agencies in and around London.",
    content2:
      "Working with both green field and legacy codebases gave me the chance to not only learn new technologies and approaches, but also to gain a deeper understanding of how to maintain and improve existing systems. This diverse range of experience was invaluable in helping me to become a well-rounded engineer.",
    notableWork: [
      {
        id: "WWF",
        displayName: "WWF (#EndangeredEmoji)",
        url: "https://cohaesus.co.uk/work/wwf/",
      },
      {
        id: "highland-park",
        displayName: "Highland Park",
        url: "https://www.highlandparkwhisky.com/",
      },
      {
        id: "fatface",
        displayName: "FatFace",
        url: "https://www.fatface.com/",
      },
    ],
  },
  {
    id: "rockstar-qa",
    displayName: "Rockstar North",
    url: "https://www.rockstarnorth.com/",
    position: "QA Tester",
    startDate: "May 14",
    endDate: "Feb 15",
    location: "Edinburgh, UK",
    content1:
      "Credited as a QA Tester on Grand Theft Auto V, I helped ensure the overall quality of the existing game and any upcoming features. It was a rewarding and challenging experience that allowed me to make a meaningful contribution to the development of one of the best-selling video games of all time.",
    content2:
      "Responsibilities included finding and accurately reporting issues through detailed bug reports, providing critical analysis and feedback, and executing various types of testing across multiple platforms.",
    notableWork: [
      {
        id: "gtav-credits",
        displayName: "Grand Theft Auto V",
        url: "https://www.rockstargames.com/gta-v/thankyou",
      },
    ],
  },
];
