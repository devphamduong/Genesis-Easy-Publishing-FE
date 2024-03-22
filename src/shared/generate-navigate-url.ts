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

export const getEditStoryURL = (id: number | string, slug: string): string => {
  return `/author/write-story?mode=edit&storyId=${id}&storyTitle=${slug}`;
};

export const getWriteChapterURL = (
  id: number | string,
  slug: string
): string => {
  return `/author/write-chapter?mode=add&storyId=${id}&storyTitle=${slug}`;
};

export const getEditChapterURL = (
  storyId: number | string,
  chapterId: number | string,
  slug: string
): string => {
  return `/author/write-chapter?mode=edit&storyId=${storyId}&chapterId=${chapterId}&storyTitle=${slug}`;
};

export const getChapterEditURL = (id: number | string): string => {
  return `/author/write-chapter?edit-chapter-id=${id}`;
};
