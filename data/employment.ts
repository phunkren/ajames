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
      "As a member of the Coinbase Prime team, I'm dedicated to delivering intuitive and trustworthy user experiences for our institutional customers by efficiently executing and maintaining frontend features on the platform and the admin interface.",
    content2:
      "My latest achievement was being a part of the team that developed and successfully launched the Data Marketplace MVP, where I had the opportunity to work with people from various disciplines across the company to provide historical datasets from the Coinbase Exchange.",
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
      "I collaborated with other technology teams at Rockstar's worldwide studios to develop front-end features and applications for the company's online services. My responsibilities included maintaining legacy architecture and delivering feature-flagged content under time-sensitive release cycles.",
    content2:
      "My key achievements at Rockstar included working with other engineers to update the Social Club website to meet AA accessibility standards, as well as developing the foundations of an accessible design system with designers and product managers that could be used across all Rockstar-branded sites.",
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
      "I played a key role in the development and launch of several successful startup ventures. My responsibilities included leading small engineering teams through scoped deliverables, and collaborating with cross-functional teams to engineer a robust and well-documented product that could be taken to market.",
    content2:
      "I also participated in the Code First Girls program, which aims to reduce the gender diversity gap by giving women the opportunity to pursue a career in tech. Mentoring  allowed me to directly contribute to the community and support the growth and development of future engineers.",
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
      {
        id: "code-first-girls",
        displayName: "Code First Girls",
        url: "https://codefirstgirls.com/about-us/",
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
      "During my time at Fathom, I worked on challenging data visualization and trading platform projects for fintech clients and major banks. I was also involved in delivering a React Native prototype of an international business planning software company's desktop offerings.",
    content2:
      "Alongside client work, I was also involved in the redesign of the company's website, and regularly participated in hackathons and technical live streams in the office.",
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
    url: "https://employer5.com",
    position: "Associate Engineer",
    startDate: "Feb 15",
    endDate: "Jun 17",
    location: "London, UK",
    content1:
      "Cohaesus is a commercial advertising agency where I had the opportunity to learn the fundamentals of frontend web development while working on a variety of projects both in-house and at some of the top advertising agencies in and around London.",
    content2:
      "I gained valuable experience working with both green field and legacy codebases, which helped me to develop a well-rounded foundational skill set in web development.",
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
      "Credited as a QA Tester (and later a software engineer) on Grand Theft Auto V, I played a crucial role in ensuring the overall quality of the game. It was a rewarding and challenging experience that allowed me to make a meaningful contribution to the development of one of the best-selling games of all time.",
    content2:
      "Responsibilities included finding and accurately reporting issues through detailed bug reports, providing critical analysis and feedback, and executing various types of testing across multiple platforms.",
    notableWork: [
      {
        id: "gtav-credits",
        displayName: "Grand Theft Auto V (credits)",
        url: "https://www.rockstargames.com/gta-v/thankyou",
      },
    ],
  },
];
