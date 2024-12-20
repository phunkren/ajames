type Education = {
  id: string;
  qualification?: string;
  course: string;
  institution: string;
  startDate?: string;
  endDate: string;
};

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
  endDate?: string;
  location: string;
  content: string;
  notableWork?: NoteableWork[];
};

type Social = {
  id: string;
  displayName: string;
  url: string;
  handle: string;
};

type Testimonial = {
  id: string;
  name: string;
  url: string;
  position: string;
  quote: string;
};

type Project = {
  id: string;
  name: string;
  url: string;
  description: string;
};

type Page = {
  id: string;
  name: string;
  url: string;
  description: string;
};

export const EDUCATION: Education[] = [
  {
    id: "gcal-uk",
    qualification: "BSc (Hons) 2.1",
    course: "Audio Technology",
    institution: "Glasgow Caledonian University",
    startDate: "2010-08-01",
    endDate: "2014-06-01",
  },
  {
    id: "gcal-usa",
    course: "Erasmus+ Study Abroad",
    institution: "UMass Boston",
    startDate: "2011-08-01",
    endDate: "2012-06-01",
  },
];

export const EMPLOYMENT: Employer[] = [
  {
    id: "coinbase",
    displayName: "Coinbase",
    url: "https://www.coinbase.com/",
    position: "Senior Software Engineer (IC5)",
    startDate: "2022-03-01",
    location: "Remote, EMEA",
    content:
      "Currently working within a multi-disciplinary team to create intuitive and trustworthy user experiences for institutional customers on Coinbase Prime. Committed to technical integrity, I build and maintain robust frontend infrastructure to deliver high-performing, reliable user interfaces. I also ensure seamless trade execution and efficient portfolio management over the Prime UI surfaces. Additionally, I previously led the UI development for the Data Marketplace.",
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
    position: "Software Engineer",
    startDate: "2020-11-01",
    endDate: "2022-02-01",
    location: "Edinburgh, UK",
    content:
      "Worked with teams across Rockstar's worldwide studios to develop frontend features and applications for the company's online services. Delivered feature-flagged content under time-sensitive release cycles, whilst maintaining legacy architecture. Key contributions included updating the Social Club to meet AA accessibility standards, and developing the foundations of an internal design system.",
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
    displayName: "BCG Digital Ventures",
    url: "https://www.bcgdv.com/",
    position: "Senior Frontend Engineer",
    startDate: "2019-04-01",
    endDate: "2020-10-01",
    location: "London, UK",
    content:
      "Led the UI development for several successful startup and institutional businesses. Engineered, launched, and delivered robust and well-documented digital products as part of multiple cross-disciplinary teams. I also participated as a mentor in the Code First Girls program, directly contributing to the community by supporting the growth and development of future engineers.",
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
    startDate: "2017-06-01",
    endDate: "2019-03-01",
    location: "London, UK",
    content:
      "Contributed to exciting data visualization and trading platform projects for fintech clients and major banks. Also actively participated in the redesign of the company's website, and in various internal events such as hackathons, live streams, and technical presentations.",
    notableWork: [
      {
        id: "commerzbank",
        displayName: "Commerzbank",
        url: "https://www.commerzbank.com/",
      },
      {
        id: "anaplan",
        displayName: "Anaplan",
        url: "https://help.anaplan.com/0f66645c-06a5-49f8-8660-8993653f8974",
      },
      {
        id: "access-fintech",
        displayName: "Access Fintech",
        url: "https://www.accessfintech.com/",
      },
    ],
  },
  {
    id: "cohaeseus",
    displayName: "Cohaesus",
    url: "https://cohaesus.co.uk/",
    position: "Junior Frontend Engineer",
    startDate: "2015-02-01",
    endDate: "2017-06-01",
    location: "London, UK",
    content:
      "Learned the fundamentals of frontend web development, both in-house and at some of Londons top advertising agencies. Worked with both green field and legacy codebases that provided the chance to learn new technologies and approaches, and gain a deeper understanding of how to maintain and improve existing systems.",
    notableWork: [
      {
        id: "WWF",
        displayName: "WWF",
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
    startDate: "2014-05-01",
    endDate: "2015-02-01",
    location: "Edinburgh, UK",
    content:
      "Credited as a QA Tester on Grand Theft Auto V. Ensured the overall quality of the existing game and any upcoming features. Responsibilities included finding and accurately reporting issues through detailed bug reports, providing critical analysis and feedback, and executing various types of testing across multiple platforms.",
    notableWork: [
      {
        id: "gtav-credits",
        displayName: "Grand Theft Auto V",
        url: "https://www.rockstargames.com/gta-v/thankyou",
      },
    ],
  },
];

export const EXPERTISE = [
  "React JS",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
];

export const INTERESTS = [
  "UI Design",
  "Design Systems",
  "Infrastructure",
  "Accessibility",
  "Technical Writing",
];

export const PERSONAL = {
  name: "Andrew James",
  email: "contact@ajames.dev",
  initials: "AJ",
  location: "Scotland, UK",
  occupation: "Senior Software Engineer",
  occupationShort: "IC5 Engineer",
  keywords: [
    "Senior",
    "Frontend",
    "Software",
    "Web",
    "Developer",
    "Engineer",
    "JavaScript",
    "React",
  ],
  description:
    "I'm a senior software engineer and content creator, with a love for all things front-end.",
  profile1:
    "I'm a senior software engineer based in Glasgow, Scotland. My passion for frontend technologies continually drives me to advance my skill set and adopt the latest industry best practices. An analytical mindset and strong communication skills allow me to excel in environments where I can learn from others and inspire my peers.",
  profile2:
    "Over the years I've refined a set of technical principles to strive towards, namely: complexity should only be introduced when it’s unavoidable; code should be easy to reason with and delete; avoid abstracting too early, and the top priority is always the best possible user experience.",
};

export const SITE = {
  url: "https://ajames.dev",
  displayName: "ajames.dev",
};

export const SOCIAL: Record<string, Social> = {
  github: {
    id: "github",
    displayName: "GitHub",
    handle: "@phunkren",
    url: "https://github.com/phunkren",
  },
  linkedin: {
    id: "linkedin",
    displayName: "LinkedIn",
    handle: "@ajamesdev",
    url: "https://www.linkedin.com/in/ajamesdev/",
  },
  youtube: {
    id: "youtube",
    displayName: "YouTube",
    handle: "@ajamesdev",
    url: "https://www.youtube.com/@ajamesdev",
  },
  x: {
    id: "x",
    displayName: "X",
    handle: "@phunkren",
    url: "https://x.com/phunkren",
  },
  buyMeCoffee: {
    id: "buyMeCoffee",
    displayName: "Buy Me a Coffee",
    handle: "phunkren",
    url: "https://www.buymeacoffee.com/phunkren",
  },
  email: {
    id: "email",
    displayName: "Email",
    handle: PERSONAL.email,
    url: `mailto:${PERSONAL.email}`,
  },
  codeSandbox: {
    id: "codeSandbox",
    displayName: "Code Sandbox",
    handle: "phunkren",
    url: `https://codesandbox.io/u/phunkren`,
  },
  bluesky: {
    id: "bluesky",
    displayName: "Bluesky",
    handle: "ajames.dev",
    url: `https://bsky.app/profile/ajames.dev`,
  },
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "cb",
    name: "Chafin Bryant",
    url: "https://www.linkedin.com/in/chafin-bryant/",
    position: "Engineering Manager",
    quote:
      "Andrew's exceptional customer focus is evident in every project he undertakes, consistently ensuring that user needs are not just met but exceeded. His technical expertise in front-end engineering demonstrates a deep understanding of both the fundamentals and the latest industry trends.",
  },
  {
    id: "ms",
    name: "Matthew Sinclair",
    url: "https://www.linkedin.com/in/matthewsinclair/",
    position: "VP, Engineering",
    quote:
      "Rarely have I had the opportunity to work with an engineer that combines Andrew's technical calibre, his exceptional citizenship, his ability to communicate and demonstrate his ideas to both team and client, and his commitment to coaching and mentoring the folks he works with.",
  },
  {
    id: "ib",
    name: "Ian Brennan",
    url: "https://www.linkedin.com/in/ian-brennan-474245138/",
    position: "CTO",
    quote:
      "Andrew always showed a strong desire and passion for his work and the technologies behind it. He picks up techniques, approaches, libraries, and languages with ease, delivering on project requirements whilst also taking the time to truly understand how something works.",
  },
];

export const PAGES: Page[] = [
  {
    id: "about",
    name: "About",
    url: "about",
    description: "My industry experience",
  },
  {
    id: "what-i-use",
    name: "Inventory",
    url: "inventory",
    description: "My professional loadout",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "find-phunk",
    name: "Find Phunk",
    url: "https://findphunk.vercel.app/",
    description: "A daily game of 26 card Monte",
  },
];
