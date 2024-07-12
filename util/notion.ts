import uniqWith from "lodash.uniqwith";
import isEqual from "lodash.isequal";
import sortBy from "lodash.sortby";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type Cover = {
  type: "external";
  file: {
    url: string;
  };
};

type Date = {
  id: string;
  type: string;
  date: {
    start: string;
    end?: string;
  };
};

type Page = {
  id: string;
  type: string;
  title: {
    type: string;
    text: {
      content: string;
      link?: string;
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href?: string;
  }[];
};

type Checkbox = {
  id: string;
  type: string;
  checkbox: boolean;
};

type Url = {
  id: string;
  type: string;
  url: string;
};

type Abstract = {
  id: string;
  type: string;
  rich_text: {
    type: string;
    text: {
      content: string;
      link?: string;
    };
    plain_text: string;
    href?: string;
  }[];
};

type Text = {
  id: string;
  type: string;
  rich_text: {
    type: string;
    text: {
      content: string;
      link?: string;
    };
    plain_text: string;
    href?: string;
  }[];
};

type TagColor =
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "default";

export type Tag = {
  id: string;
  name: string;
  color: TagColor;
  count?: number;
};

type Tags = {
  id: string;
  type: string;
  multi_select: Tag[];
};

export type BlogPost = PageObjectResponse & {
  cover: Cover;
  properties: {
    published: Checkbox;
    canonical: Url;
    abstract: Abstract;
    page: Page;
    date: Date;
    slug: Text;
    tags: Tags;
  };
  related?: BlogPost[];
};

export type InventoryPage = PageObjectResponse & {
  properties: {
    id: Text;
    retailer: Text;
    title: Page;
    image: Url;
    url: Url;
    affiliate: Checkbox;
    category: Tags;
  };
};

type InventoryCategoryItem = {
  id: string;
  retailer: string;
  title: string;
  image: string;
  url: string;
  affiliate: boolean;
  category: string;
};

export type Inventory = Record<string, InventoryCategoryItem[]>;

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

export function getPublishedPosts(posts: BlogPost[]) {
  const publishedPosts = posts.filter(
    (post) => post.properties.published.checkbox
  );

  return publishedPosts;
}

export function filterPosts(
  posts: BlogPost[],
  featurePost: BlogPost,
  queryTag: string
) {
  if (!queryTag) {
    return posts.filter((post) => post.id !== featurePost.id);
  }

  return posts.filter((post) => {
    const postTags = post.properties.tags.multi_select;

    const isActive = postTags.some(
      ({ name }) => queryTag === name.toLowerCase()
    );

    return post.id !== featurePost.id && isActive;
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

export function addRelatedPosts(posts: BlogPost[]) {
  const tagMap = new Map<string, BlogPost[]>();

  for (const post of posts) {
    for (const tag of post.properties.tags.multi_select) {
      const taggedPosts = tagMap.get(tag.id) || [];
      taggedPosts.push(post);
      tagMap.set(tag.id, taggedPosts);
    }
  }

  return posts.map((post) => {
    const related = post.properties.tags.multi_select
      .flatMap((tag) => tagMap.get(tag.id) || [])
      .filter(
        (relatedPost) =>
          relatedPost.properties.page.title[0].plain_text !==
          post.properties.page.title[0].plain_text
      );

    return {
      ...post,
      related,
    };
  });
}

export function getRandomPosts(arr: BlogPost[], numElements: number): any[] {
  const result = [];
  const length = arr.length;

  if (numElements >= length) {
    // If numElements is greater than or equal to the length of the array, return the original array
    return arr;
  }

  // Generate numElements random indices
  const randomIndices = new Set<number>();
  while (randomIndices.size < numElements) {
    const randomIndex = Math.floor(Math.random() * length);
    randomIndices.add(randomIndex);
  }

  // Retrieve the elements at the random indices
  randomIndices.forEach((index) => {
    result.push(arr[index]);
  });

  return result;
}

export function getFormattedInventory(
  inventoryPages: InventoryPage[]
): Inventory {
  return inventoryPages.reduce((acc: Inventory, item: InventoryPage) => {
    const category = item.properties.category.multi_select[0].name;

    if (!acc[`${category}`]) {
      acc[`${category}`] = [];
    }

    const inventoryCategoryItem = {
      id: item.properties.id.rich_text[0].text.content,
      retailer: item.properties.retailer.rich_text[0].text.content,
      title: item.properties.title.title[0].text.content,
      image: item.properties.image.url,
      url: item.properties.url.url,
      affiliate: item.properties.affiliate.checkbox,
      category,
    };

    acc[`${category}`].push(inventoryCategoryItem);

    return acc;
  }, {} as Inventory);
}

export function sortInventory(inventory: Inventory) {
  const inventoryEntries = Object.entries(inventory);

  const sortedInventoryEntries = inventoryEntries.map(
    ([category, categoryItems]) => {
      const sortedItems = sortBy(categoryItems, ["title"]);
      return [category, sortedItems];
    }
  );

  return Object.fromEntries(sortedInventoryEntries);
}

export function getUniqueRetailers(inventory: Inventory) {
  const uniqueRetailers = new Set<string>();

  for (const key in inventory) {
    inventory[key].forEach((item) => {
      uniqueRetailers.add(item.retailer);
    });
  }

  return uniqueRetailers.size;
}
