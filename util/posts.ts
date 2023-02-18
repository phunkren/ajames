import uniqWith from "lodash.uniqwith";
import isEqual from "lodash.isequal";
import { BlogPost, Tag } from "../types/notion";
import { ParsedUrlQuery } from "querystring";

export function getTags(posts: BlogPost[]): Tag[] {
  const allTags = posts.flatMap((post) => post.properties.tags.multi_select);
  const uniqueTags: Tag[] = uniqWith(allTags, isEqual);

  function getTagCount(tags: Tag[], tag: Tag) {
    return tags.reduce((total, currentTag) => {
      return isEqual(currentTag, tag) ? total + 1 : total;
    }, 0);
  }

  const formattedTags = uniqueTags.map((tag) => {
    return {
      ...tag,
      name: tag.name.toLowerCase(),
      count: getTagCount(allTags, tag),
    };
  });

  return formattedTags;
}

export function filterPosts(posts: BlogPost[], queryTag: string) {
  if (!queryTag) {
    return posts;
  }

  return posts.filter((post) => {
    const postTags = post.properties.tags.multi_select;

    const isActive = postTags.some(
      ({ name }) => queryTag === name.toLowerCase()
    );

    return isActive;
  });
}

export function sortPosts(posts: BlogPost[]) {
  return posts.sort((a, b) => {
    let dateA = new Date(a.properties.date.date.start).getTime();
    let dateB = new Date(b.properties.date.date.start).getTime();

    return dateB - dateA;
  });
}

export function formatReadingTime(time: number) {
  const roundedTime = Math.ceil(time);

  if (!time) {
    return "Unknown";
  }

  if (time === 1) {
    return `${roundedTime} minute`;
  }

  return `${roundedTime} minutes`;
}

export function formatCount(count: number) {
  if (!count) {
    return "Unknown";
  }

  if (count === 1) {
    return `${count} video`;
  }

  return `${count} videos`;
}
