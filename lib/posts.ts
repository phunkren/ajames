import * as fs from "fs";
import path from "path";
import { POSTS_DIR } from "../constants/posts";

export function getAllPostIds() {
  const fileNames = fs.readdirSync(POSTS_DIR);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getPostData(id) {
  const fullPath = path.join(POSTS_DIR, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Combine the data with the id
  return fileContents;
}
