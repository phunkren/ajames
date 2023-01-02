import { BlogPost } from "../types/notion";

export function filterPosts(posts: BlogPost[], activeTagId) {
  return posts.filter((post) => {
    const postTags = post.properties.tags.multi_select;
    const isActive = postTags.some((postTag) => postTag.id === activeTagId);
    return isActive;
  });
}

export function sortPosts(posts: BlogPost[]) {
  return posts.sort((a, b) => {
    let dateA = new Date(a.properties.date.date.start as string).getTime();
    let dateB = new Date(b.properties.date.date.start as string).getTime();
    return dateB - dateA;
  });
}
