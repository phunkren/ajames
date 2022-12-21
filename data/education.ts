type Education = {
  id: string;
  qualification?: string;
  course: string;
  institution: string;
  startDate?: string;
  endDate: string;
};

export const EDUCATION: Education[] = [
  {
    id: "gcal-uk",
    qualification: "BSc (Hons) 2.1",
    course: "Audio Technology",
    institution: "Glasgow Caledonian University",
    startDate: "2010",
    endDate: "2014",
  },
  {
    id: "gcal-usa",
    course: "Erasmus+ Study Abroad",
    institution: "UMass Boston",
    startDate: "2011",
    endDate: "2012",
  },
  {
    id: "udacity",
    qualification: "Graduate",
    course: "Frontend Nanodegree",
    institution: "Udacity",
    endDate: "2016",
  },
];
