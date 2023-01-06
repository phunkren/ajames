type NoteableWork = {
  id: string;
  displayName: string;
  url?: string;
};

export type Employer = {
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
