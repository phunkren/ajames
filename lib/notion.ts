import * as fs from "fs";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { POSTS_DIR } from "../constants/posts";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Ref: https://www.npmjs.com/package/notion-to-md
const n2m = new NotionToMarkdown({ notionClient: notion });

export const createPost = async (uuid: string, slug: string) => {
  const mdblocks = await n2m.pageToMarkdown(uuid);
  const mdString = n2m.toMarkdownString(mdblocks);
  const filename = `${POSTS_DIR}/${slug}.md`;

  fs.writeFile(filename, mdString, (err) => {
    console.log(err);
  });
};

export const getDatabase = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results;
};

export const getPosts = async () => {
  const personalPosts = await getDatabase(
    process.env.NOTION_PERSONAL_DATABASE_ID
  );

  const professionalPosts = await getDatabase(
    process.env.NOTION_PROFESSIONAL_DATABASE_ID
  );

  return {
    personal: personalPosts,
    professional: professionalPosts,
  };
};

// Generate a markdown file for each blog post in Notion
(async () => {
  const { personal, professional } = await getPosts();
  const posts = [...personal, ...professional];

  for (const post of posts) {
    const uuid = post.id;
    //@ts-expect-error
    const slug = post.properties.slug.rich_text[0].plain_text;

    createPost(uuid, slug);
  }
})();
