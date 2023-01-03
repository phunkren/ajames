import * as fs from "fs";
import path from "path";
import { remark } from "remark";
import mdx from "remark-mdx";
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

export async function getPostData(id: string) {
  const fullPath = path.join(POSTS_DIR, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const processedContent = await remark().use(mdx).process(fileContents);
  const contentHtml = processedContent.toString();

  return contentHtml;
}
