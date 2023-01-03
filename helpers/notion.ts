import uniqWith from "lodash.uniqwith";
import isEqual from "lodash.isequal";
import { BlogPost, Tag } from "../types/notion";

function getTagCount(tags: Tag[], tag: Tag) {
  return tags.reduce((total, currentTag) => {
    return isEqual(currentTag, tag) ? total + 1 : total;
  }, 0);
}

export function getTags(posts: BlogPost[]): Tag[] {
  const allTags = posts.flatMap((post) => post.properties.tags.multi_select);

  const uniqueTags: Tag[] = uniqWith(allTags, isEqual);

  const formattedTags = uniqueTags.map((tag) => {
    return {
      ...tag,
      name: tag.name.toLowerCase(),
      count: getTagCount(allTags, tag),
    };
  });

  return formattedTags;
}
