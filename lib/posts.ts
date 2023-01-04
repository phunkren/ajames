import * as fs from "fs";
import path from "path";
import { remark } from "remark";
import { rehype } from "rehype";
import mdx from "remark-mdx";
import rehypeInferReadingTimeMeta from "rehype-infer-reading-time-meta";
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

export async function getPostTime(content: string) {
  const { data } = await rehype()
    .use(rehypeInferReadingTimeMeta)
    .process(content);

  const [readingTime] = data.meta.readingTime as [number, number];

  return readingTime;
}
