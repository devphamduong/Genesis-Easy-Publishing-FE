import { slugify } from "./function";

export const getStoryDetailURL = (
  id: number | string,
  title: string
): string => {
  return `/story/${id}/${slugify(title)}`;
};

export const getStoryCategoryURL = (
  id: number | string,
  name: string
): string => {
  return `/category/${id}/${slugify(name)}`;
};

export const getStoryReadURL = (
  id: number | string,
  slug: string,
  chapter: number
): string => {
  return `/story/read/${id}/${slug}.chapter-${chapter}`;
};
