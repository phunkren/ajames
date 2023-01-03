import * as fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import { POSTS_DIR } from "../constants/posts";

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

export async function getPostData(id) {
  const fullPath = path.join(POSTS_DIR, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(fileContents);

  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return contentHtml;
}
