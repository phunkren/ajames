import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabase = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results;
};

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });

  return response;
};

export const getBlocks = async (blockId: string) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
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
