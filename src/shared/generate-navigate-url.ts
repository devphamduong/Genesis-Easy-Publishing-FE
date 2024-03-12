import { slugify } from "./function";

export const getStoryDetailURL = (
  id: number | string,
  title: string
): string => {
  return `/story/detail/${id}/${slugify(title)}`;
};

export const getAuthorDetailURL = (id?: number | string): string => {
  return `/author/detail?authorId=${id}`;
};

export const getCategoryDetailURL = (
  id: number | string,
  title: string
): string => {
  return `/category/detail/${id}/${slugify(title)}`;
};

export const getStoryReadURL = (
  id: number | string,
  slug: string,
  chapter: number
): string => {
  return `/story/read/${id}/${slug}.chapter-${chapter}`;
};
