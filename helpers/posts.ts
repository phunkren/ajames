import { BlogPost } from "../types/notion";

export function filterPosts(posts: BlogPost[], activeTagId) {
  return posts.filter((post) => {
    const postTags = post.properties.tags.multi_select;
    const isActive = postTags.some((postTag) => postTag.id === activeTagId);
    return isActive;
  });
}
