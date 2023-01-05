import { BlogPost } from "../types/notion";

export function filterPosts(posts: BlogPost[], activeTagName) {
  return posts.filter((post) => {
    const postTags = post.properties.tags.multi_select;

    const isActive = postTags.some(
      ({ name }) => name.toLowerCase() === activeTagName.toLowerCase()
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

export function formatDate(date: string) {
  const formattedDate = new Date(date).toLocaleDateString();

  return formattedDate;
}
