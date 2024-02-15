import { ICategory } from "./category.interface";

export interface IStory {
  storyId: number;
  storyTitle: string;
  storyImage: string;
  storyDescription: string;
  storyCategories: ICategory[];
  storyAuthor: {
    userId: number;
    userFullname: string;
  };
  storyChapterNumber: number;
  storyLatestChapter?: {
    chapterId: number;
    chapterTitle: string;
  };
  read: number;
  like?: number;
  follow?: number;
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
