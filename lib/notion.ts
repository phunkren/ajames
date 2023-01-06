import * as fs from "fs";
import path from "path";
import { remark } from "remark";
import { rehype } from "rehype";
import mdx from "remark-mdx";
import rehypeInferReadingTimeMeta from "rehype-infer-reading-time-meta";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { BlogPost } from "../types/notion";

const POSTS_DIR = path.join(process.cwd(), "posts");

const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Ref: https://www.npmjs.com/package/notion-to-md
const n2m = new NotionToMarkdown({ notionClient });

// Create markdown file from Notion blog post
export const createPost = async (uuid: string, slug: string) => {
  const mdblocks = await n2m.pageToMarkdown(uuid);

  const mdString = n2m.toMarkdownString(mdblocks);

  const filename = `${POSTS_DIR}/${slug}.mdx`;

  fs.writeFile(filename, mdString, (err) => {
    err !== null && console.log(err);
  });
};

export const getDatabase = async (databaseId: string) => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
  });

  return response.results;
};

export const getPosts = async () => {
  const personalPosts = (await getDatabase(
    process.env.NOTION_PERSONAL_DATABASE_ID
  )) as BlogPost[];

  const professionalPosts = (await getDatabase(
    process.env.NOTION_PROFESSIONAL_DATABASE_ID
  )) as BlogPost[];

  return {
    personal: personalPosts,
    professional: professionalPosts,
  };
};

export const getPageData = async (slug: string) => {
  const { personal, professional } = await getPosts();
  const posts = [...personal, ...professional];

  const page = posts.find((post) => {
    const postSlug = post.properties.slug.rich_text[0].plain_text;
    return postSlug === slug;
  });

  return page;
};

export function getAllPostIds() {
  const fileNames = fs.readdirSync(POSTS_DIR);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, ""),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(POSTS_DIR, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const processedContent = await remark().use(mdx).process(fileContents);
  const contentHtml = processedContent.toString();

  return contentHtml;
}

export async function getPostTime(content: string) {
  const { data } = await rehype()
    .use(rehypeInferReadingTimeMeta)
    .process(content);

  const [readingTime] = data.meta.readingTime as [number, number];

  return readingTime;
}

// Generate a markdown file for each blog post in Notion on build
(async () => {
  const { personal, professional } = await getPosts();
  const posts = [...personal, ...professional];

  for (const post of posts) {
    const uuid = post.id;
    const slug = post.properties.slug.rich_text[0].plain_text;

    createPost(uuid, slug);
  }
})();
