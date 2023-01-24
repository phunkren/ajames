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
  endDate?: string;
  location: string;
  content: string;
  notableWork?: NoteableWork[];
};
