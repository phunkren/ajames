import { BlogPost } from "../types/notion";

export function filterPosts(posts: BlogPost[], activeTagName) {
  return posts.filter((post) => {
    const postTags = post.properties.tags.multi_select;
    const isActive = postTags.some((postTag) => postTag.name === activeTagName);

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
