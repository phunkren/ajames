import uniqWith from "lodash.uniqwith";
import isEqual from "lodash.isequal";
import { BlogPost, Tag } from "../types/notion";

export function getTags(posts: BlogPost[]): Tag[] {
  const allTags = posts.flatMap((post) => post.properties.tags.multi_select);

  const uniqueTags: Tag[] = uniqWith(allTags, isEqual);

  // Check to see how many times a unique tag appears in the allTags array
  const uniqueTagsWithCount = uniqueTags.map((uniqueTag) => {
    const count = allTags.reduce((acc, curr) => {
      return isEqual(curr, uniqueTag) ? acc + 1 : acc;
    }, 0);

    return { ...uniqueTag, count };
  });

  return uniqueTagsWithCount;
}
