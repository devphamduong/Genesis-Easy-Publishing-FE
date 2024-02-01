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
}

export interface IPaginationStory {
  totalStories: number;
  totalPage: number;
  current: number;
  pageSize: number;
  listStories: IStory[];
}
