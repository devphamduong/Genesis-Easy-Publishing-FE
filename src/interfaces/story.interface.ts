import { ICategory } from "./category.interface";

export interface IStory {
  storyId: number | string;
  storyTitle: string;
  storyImage: string;
  storyDescription: string;
  storyDescriptionMarkdown?: string;
  storyDescriptionHtml?: string;
  storyCategories: ICategory[];
  storyAuthor: {
    userId: number | string;
    userFullname: string;
  };
  storyChapterNumber: number;
  storyChapters?: IChapter[];
  storyLatestChapter: {
    chapterId: number | string;
    chapterTitle: string;
    chapterNumber: number;
    createTime: string;
  };
  storyReadChapter: {
    chapterId: number | string;
    chapterTitle: string;
    chapterNumber: number;
    createTime: string;
  };
  userCount?: number;
  storyPrice: number;
  storySale: number;
  userPurchaseStory?: number;
  userPurchaseChapter?: number;
  storyInteraction?: {
    follow: number;
    like: number;
    read: number;
    storyId: number;
    view: number;
  };
  userOwned: boolean;
  authorOwned: boolean;
  userFollow: boolean;
  userLike: boolean;
  storyCreateTime: string;
  status?: number;
  storyStatus: number;
}

export interface IStoryInteraction {
  follow?: number;
  like?: number;
  read?: number;
  view?: number;
  purchaseChapter?: number;
  purchaseStory?: number;
  reportStory?: number;
  commentStory?: number;
  commentChapter?: number;
  reportChapter?: number;
}

export interface IAuthor {
  authorId: number;
  authorName: string;
  authorImage: string;
  authorStories: number;
  authorDescriptionHtml?: string;
  authorDescriptionMarkdown?: string;
  authorNewestStory: {
    storyId: number;
    storyTitle: string;
    storyImage: string;
    storyDescription: string;
    storyDescriptionMarkdown?: string;
    storyDescriptionHtml?: string;
  };
}

export interface IPaginationStory {
  totalStories: number;
  totalPage: number;
  current: number;
  pageSize: number;
  list: IStory[];
}

export interface IChapter {
  chapterId: number;
  volumeId: number;
  storyTitle: string;
  chapterNumber: number;
  chapterTitle: string;
  chapterPrice: number;
  createTime: string;
  comment: number;
  userPurchaseChapter: number;
  chapterContentMarkdown: string;
  chapterContentHtml: string;
  status: number;
}

export interface IChapterInteraction {
  interaction: {
    chapterId: number;
    chapterTitle: string;
    chapterNumber: number;
    purchaseChapter: number;
    reportChapter: number;
  }[];
  min: number;
  max: number;
}

export interface IComment {
  userComment: {
    userId: number;
    userFullname: string;
    userImage?: string;
  };
  commentId: number;
  commentContent: string;
  commentDate: string;
  commentWriter: boolean;
}

export interface ISendCommentPayload {
  storyId: number | string;
  chapterId?: number;
  commentContent: string;
}

export interface IPaginationChapter {
  total: number;
  totalPage: number;
  current: number;
  pageSize: number;
  list: IChapter[];
}

export interface IPaginationComment {
  total: number;
  totalPage: number;
  current: number;
  pageSize: number;
  list: IComment[];
}

export interface IWriteStoryForm {
  storyTitle?: string;
  type?: string;
  storyId: number | string;
  authorId?: string | number;
  storyPrice: number;
  storySale: number;
  storyImage?: string;
  status?: number;
  categoryIds?: string[];
  storyDescription?: string;
  storyDescriptionMarkdown?: string;
  storyDescriptionHtml?: string;
}

export interface IWriteChapterForm {
  storyId: number | string;
  chapterId: number | string;
  volumeId: number;
  chapterTitle: string;
  storyTitle: string;
  chapterContentMarkdown: string;
  chapterContentHtml: string;
  chapterPrice: number;
}

export interface IReportForm {
  reportTypeId: number;
  storyId: number;
  chapterId?: number;
  commentId?: number;
  reportContent?: string;
}

export interface IChapterContent {
  story: {
    storyId: number;
    storyTitle: string;
    storyPrice: number;
  };
  author: {
    userId: number;
    userFullname: string;
  };
  content: string;
  chapterId: number;
  chapterNumber: number;
  chapterTitle: string;
  chapterPrice: number;
  createTime: string;
  updateTime: string;
  comment: number;
  userPurchaseChapter: number;
  prevChapterNumber: number;
  nextChapterNumber: number;
  message: string;
  userLike: boolean;
  owned: boolean;
}

export interface IVolume {
  volumeId: number;
  volumeNumber: number;
  volumeTitle: string;
  createTime: string;
  chapters: IChapter[];
}
