import { ICategory } from "./category.interface";

export interface IStory {
  storyId: number | string;
  storyTitle: string;
  storyImage: string;
  storyDescription: string;
  storyCategories: ICategory[];
  storyAuthor: {
    userId: number | string;
    userFullname: string;
  };
  storyChapterNumber: number;
  storyLatestChapter?: {
    chapterId: number | string;
    chapterTitle: string;
  };
  userCount?: number;
  userPurchaseStory?: number;
  userPurchaseChapter?: number;
  storyInteraction?: {
    follow: number;
    like: number;
    read: number;
    storyId: number;
    view: number;
  };
}

export interface IAuthor {
  authorId: number;
  authorName: string;
  authorImage: string;
  authorStories: number;
  authorNewestStory: {
    storyId: number;
    storyTitle: string;
    storyImage: string;
    storyDescription: string;
  };
}

export interface IPaginationStory {
  totalStories: number;
  totalPage: number;
  current: number;
  pageSize: number;
  listStories: IStory[];
}
