import {
  PageObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type BlogPost = PageObjectResponse | PartialPageObjectResponse;
