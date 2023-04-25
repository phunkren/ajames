import * as fs from "fs";
import path from "path";
import { remark } from "remark";
import { rehype } from "rehype";
import mdx from "remark-mdx";
import rehypeInferReadingTimeMeta from "rehype-infer-reading-time-meta";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { addRelatedPosts, BlogPost, getTags } from "../util/notion";
import { PERSONAL, SITE, SOCIAL } from "../util/data";
import { Feed } from "feed";

const POSTS_DIR = path.join(process.cwd(), "posts");

const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Ref: https://www.npmjs.com/package/notion-to-md
const n2m = new NotionToMarkdown({ notionClient });

// Retrieve all blog posts from Notion
export const getPosts = async () => {
  const personalPosts = (await getDatabase(
    process.env.NOTION_PERSONAL_DATABASE_ID
  )) as BlogPost[];

  const professionalPosts = (await getDatabase(
    process.env.NOTION_PROFESSIONAL_DATABASE_ID
  )) as BlogPost[];

  const posts = [...personalPosts, ...professionalPosts];

  const publishedPosts = posts.filter(
    (post) => post.properties.published.checkbox
  );

  const relatedPosts = addRelatedPosts(publishedPosts);

  return relatedPosts;
};

// Create markdown file from each Notion blog post
export async function createPosts(posts: BlogPost[]) {
  for (const post of posts) {
    const uuid = post.id;
    const slug = post.properties.slug.rich_text[0].plain_text;
    const mdblocks = await n2m.pageToMarkdown(uuid);
    const mdString = n2m.toMarkdownString(mdblocks);
    const filename = `${POSTS_DIR}/${slug}.mdx`;

    fs.writeFile(filename, mdString, (err) => {
      err !== null && console.log(err);
    });
  }
}

export const getDatabase = async (databaseId: string) => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
  });

  return response.results;
};

export const getPageData = async (slug: string) => {
  const posts = await getPosts();

  const page = posts.find((post) => {
    const postSlug = post.properties.slug.rich_text[0].plain_text;
    return postSlug === slug;
  });

  return page;
};

export const getPageLink = async (id: string) => {};

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
  const postData = processedContent.toString();

  // Split the markdown string into an array of blocks
  const split = fileContents.split("\n\n\n");

  // Determine the middle index
  const middleElement = Math.round(split.length / 2);

  // Find the next header, image, or clode block
  const nextValidIndex = split.findIndex((line, index) => {
    if (index <= middleElement) {
      return false;
    }

    if (
      line.includes("##") ||
      line.includes("###") ||
      line.includes("![") ||
      line.includes("```")
    ) {
      return true;
    }
  });

  console.log({ middleElement, nextValidIndex });

  const sliceIndex = nextValidIndex >= 0 ? nextValidIndex : middleElement;

  const sectionOneMdx = await remark()
    .use(mdx)
    .process(split.slice(0, sliceIndex).join("\n\n"));

  const sectionTwoMdx = await remark()
    .use(mdx)
    .process(split.slice(sliceIndex).join("\n\n"));

  const sectionOne = sectionOneMdx.toString();
  const sectionTwo = sectionTwoMdx.toString();

  return { postData, sectionOne, sectionTwo };
}

export async function getPostTime(
  sectionOneContent: string,
  sectionTwoContent: string
) {
  const { data: sectionOneData } = await rehype()
    .use(rehypeInferReadingTimeMeta)
    .process(sectionOneContent);

  const { data: sectionTwoData } = await rehype()
    .use(rehypeInferReadingTimeMeta)
    .process(sectionTwoContent);

  const [sectionOneTime] = sectionOneData.meta.readingTime as [number, number];
  const [sectionTwoTime] = sectionTwoData.meta.readingTime as [number, number];

  return sectionOneTime + sectionTwoTime;
}

export async function generateRSSFeed(posts: BlogPost[]) {
  const baseUrl = SITE.url;

  const author = {
    name: PERSONAL.name,
    email: PERSONAL.email,
    link: SOCIAL.twitter.url,
  };

  const feed = new Feed({
    title: `${SITE.displayName} | Blogs`,
    description: `${PERSONAL.profile1}${PERSONAL.profile2}`,
    id: baseUrl,
    link: baseUrl,
    language: "en",
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${
      PERSONAL.name
    }`,
    feedLinks: {
      rss: `${baseUrl}/rss.xml`,
    },
    author,
  });

  // Synchronously add each blog post to the RSS feed
  for await (const post of posts) {
    const title = post.properties.page.title[0].plain_text;
    const description = post.properties.abstract.rich_text[0].plain_text;
    const date = post.properties.date.date.start;
    const slug = post.properties.slug.rich_text[0].plain_text;
    const url = `${baseUrl}/blog/${slug}`;
    const { postData } = await getPostData(slug);
    const image = { url: post.cover.external.url };
    const category = post.properties.tags.multi_select.map(({ name }) => ({
      name,
    }));

    feed.addItem({
      title,
      id: url,
      link: url,
      description,
      content: postData,
      image,
      category,
      author: [author],
      date: new Date(date),
    });
  }

  // Write the RSS output to a public file
  fs.writeFileSync("public/rss.xml", feed.rss2());
}
