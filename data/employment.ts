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
      "In gravida ligula ass fizzle. Prizzle ghetto. Etizzle for sure. Donizzle in mi a erizzle imperdiet vehicula. Ass vizzle go to hizzle. Sizzle est the bizzle lacizzle. Praesent a ipsizzle gangster urna euismizzle fo shizzle mah nizzle fo rizzle, mah home g-dizzle. Integizzle nec fo shizzle. Fo shizzle tellivizzle dang vel da bomb. Morbi my shizz justo. Etiam eu dui izzle magna elementizzle lobortis.",
    content2:
      "Donizzle cool auctor maurizzle. Izzle bizzle uhuh ... yih! fizzle nibh pretizzle sheezy. Maecenizzle a sheezy. Shiznit izzle lacus sizzle gangster elementizzle tristique. Nunc check out this tortizzle sit amet pot ultricizzle break yo neck, yall. In mah nizzle yo, we gonna chung izzle, quizzle, adipiscing quis, pimpin. Etizzle velit leo, aliquam shiznit, pharetra nizzle, go to hizzle sizzle, get down get down. Vivamus gangster.",
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
      "I played a key role in the development and launch of several successful startup ventures. My responsibilities included collaborating with cross-functional teams to engineer a robust and well-documented product, mentoring and supporting associate engineers, and leading small engineering teams through key deliverables.",
    content2:
      "I also had the opportunity to mentor aspiring female engineers in the Code First Girls program, which aims to reduce the gender diversity gap in tech globally by giving women the opportunity to pursue a career in tech. Mentoring aspiring female engineers allowed me to contribute to the engineering community and support the growth and development of future engineers.",
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
      "I worked on challenging data visualization and trading platform projects for fintech and major bank clients. I also delivered a React Native prototype and collaborated on technical live streams.",
    content2:
      "I consistently demonstrated strong technical skills and a commitment to delivering high-quality work",
    notableWork: [
      {
        id: "access-fintech",
        displayName: "Access Fintech",
        url: "https://www.accessfintech.com/",
      },
      {
        id: "anaplan",
        displayName: "Anaplan",
        url: "https://www.commerzbank.com/",
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
      "Prizzle vitae erat black libero shizzlin dizzle adipiscing. Fusce ac augue eu shizznit ullamcorpizzle sure. Shiznit fermentizzle sapizzle ass erat. Suspendisse lorizzle leo, sollicitudizzle dang, mattizzle ass, commodo pimpin', justo. Break yo neck, yall boom shackalack porttitor ligula. Check it out for sure, doggy a ornare da bomb, sapizzle metizzle ante, egizzle boofron my shizz enim fo shizzle lorizzle. Phasellus quam shiznit, imperdizzle hizzle, tempizzle shut the shizzle up, sempizzle in, sapien.",
    content2:
      "Yo eu bling bling. Break it down porta its fo rizzle tellus. Gizzle viverra, doggy izzle away hendrerizzle, libero urna sheezy leo, fizzle doggy my shizz sapizzle cool daahng dawg. Donizzle sheezy dolizzle. Vestibulizzle shit felizzle. ",
    content3:
      "Tellivizzle elementum mammasay mammasa mamma oo sa nizzle. Nizzle nulla gangster, shiz izzle, volutpizzle sheezy, auctor eget, things. Sed pharetra. Mah nizzle nisi. Pot amizzle leo fo shizzle my nizzle shizznit blandit dignissim. Quisque laorizzle dizzle sit enim. Aenizzle tempizzle dignissim felizzle.",
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
      "Prizzle vitae erat black libero shizzlin dizzle adipiscing. Fusce ac augue eu shizznit ullamcorpizzle sure. Shiznit fermentizzle sapizzle ass erat. Suspendisse lorizzle leo, sollicitudizzle dang, mattizzle ass, commodo pimpin', justo. Break yo neck, yall boom shackalack porttitor ligula. Check it out for sure, doggy a ornare da bomb, sapizzle metizzle ante, egizzle boofron my shizz enim fo shizzle lorizzle. Phasellus quam shiznit, imperdizzle hizzle, tempizzle shut the shizzle up, sempizzle in, sapien.",
    content2:
      "Yo eu bling bling. Break it down porta its fo rizzle tellus. Gizzle viverra, doggy izzle away hendrerizzle, libero urna sheezy leo, fizzle doggy my shizz sapizzle cool daahng dawg. Donizzle sheezy dolizzle. Vestibulizzle shit felizzle. ",
    content3:
      "Tellivizzle elementum mammasay mammasa mamma oo sa nizzle. Nizzle nulla gangster, shiz izzle, volutpizzle sheezy, auctor eget, things. Sed pharetra. Mah nizzle nisi. Pot amizzle leo fo shizzle my nizzle shizznit blandit dignissim. Quisque laorizzle dizzle sit enim. Aenizzle tempizzle dignissim felizzle.",
  },
];
