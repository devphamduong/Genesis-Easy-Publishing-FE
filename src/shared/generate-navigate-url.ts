import { ERouteEndPointForAuthor } from "../enums/route-end-point.enum";
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
  return `${ERouteEndPointForAuthor.WRITE_STORY}?mode=edit&storyId=${id}&storyTitle=${slug}`;
};

export const getWriteChapterURL = (
  id: number | string,
  slug: string
): string => {
  return `${ERouteEndPointForAuthor.WRITE_CHAPTER}?mode=add&storyId=${id}&storyTitle=${slug}`;
};

export const getEditChapterURL = (
  storyId: number | string,
  chapterId: number | string,
  slug: string
): string => {
  return `${ERouteEndPointForAuthor.WRITE_CHAPTER}?mode=edit&storyId=${storyId}&chapterId=${chapterId}&storyTitle=${slug}`;
};

export const getReviewAChapterURL = (
  storyId: number | string,
  chapterId: number | string
): string => {
  return `${ERouteEndPointForAuthor.REVIEW_CHAPTER}?storyId=${storyId}&chapterId=${chapterId}`;
};
