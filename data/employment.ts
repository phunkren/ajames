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
      "Crizzle break it down justo i saw beyonces tizzles and my pizzle went crizzle purizzle break it down ornare. Dawg venenatis justo izzle daahng dawg. Shizznit fizzle. Suspendisse fizzle placerat hizzle. Dang own yo' ante. Nunc pharetra, leo eu ma nizzle hendrerizzle, dawg felizzle elementizzle sizzle, go to hizzle brizzle magna felizzle luctizzle shizzle my nizzle crocodizzle. Yippiyo a i saw beyonces tizzles and my pizzle went crizzle.",
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
      "Prizzle vitae erat black libero shizzlin dizzle adipiscing. Fusce ac augue eu shizznit ullamcorpizzle sure. Shiznit fermentizzle sapizzle ass erat. Suspendisse lorizzle leo, sollicitudizzle dang, mattizzle ass, commodo pimpin', justo. Break yo neck, yall boom shackalack porttitor ligula. Check it out for sure, doggy a ornare da bomb, sapizzle metizzle ante, egizzle boofron my shizz enim fo shizzle lorizzle. Phasellus quam shiznit, imperdizzle hizzle, tempizzle shut the shizzle up, sempizzle in, sapien.",
    content2:
      "Yo eu bling bling. Break it down porta its fo rizzle tellus. Gizzle viverra, doggy izzle away hendrerizzle, libero urna sheezy leo, fizzle doggy my shizz sapizzle cool daahng dawg. Donizzle sheezy dolizzle. Vestibulizzle shit felizzle. ",
    content3:
      "Tellivizzle elementum mammasay mammasa mamma oo sa nizzle. Nizzle nulla gangster, shiz izzle, volutpizzle sheezy, auctor eget, things. Sed pharetra. Mah nizzle nisi. Pot amizzle leo fo shizzle my nizzle shizznit blandit dignissim. Quisque laorizzle dizzle sit enim. Aenizzle tempizzle dignissim felizzle.",
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
      "Crizzle break it down justo i saw beyonces tizzles and my pizzle went crizzle purizzle break it down ornare. Dawg venenatis justo izzle daahng dawg. Shizznit fizzle. Suspendisse fizzle placerat hizzle. Dang own yo' ante. Nunc pharetra, leo eu ma nizzle hendrerizzle, dawg felizzle elementizzle sizzle, go to hizzle brizzle magna felizzle luctizzle shizzle my nizzle crocodizzle. Yippiyo a i saw beyonces tizzles and my pizzle went crizzle.",
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
