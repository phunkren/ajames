import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type Authors = {
  id: string;
  type: string;
  people: {
    object: string;
    id: string;
    name: string;
    avatar_url: string;
    type: string;
    person: {
      email: string;
    };
  }[];
};

type Date = {
  date: Record<string, unknown>;
  id: string;
  type: string;
};

type Page = {
  id: string;
  type: string;
  title: {
    type: string;
    text: {
      content: string;
      link?: string;
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href?: string;
  }[];
};

type Published = {
  id: string;
  type: string;
  checkbox: boolean;
};

type Slug = {
  id: string;
  type: string;
  rich_text: {
    type: string;
    text: {
      content: string;
      link?: string;
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href?: string;
  }[];
};

type TagColor =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "pink"
  | "brown"
  | "gray"
  | "default";

export type Tag = {
  id: string;
  name: string;
  color: TagColor;
  count?: number;
};

type Tags = {
  id: string;
  type: string;
  multi_select: Tag[];
};

export type BlogPost = PageObjectResponse & {
  cover: any;
  properties: {
    authors: Authors;
    date: Date;
    page: Page;
    published: Published;
    slug: Slug;
    tags: Tags;
  };
};

// {
//   type: "file" ;
//   file: {
//     url: string;
//     expiry_time: string;
//   };
// };
