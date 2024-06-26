import { IUser } from "./auth.interface";

export interface IReviewChapterInfo {
  chapterContentHtml: string;
  chapterContentMarkdown: string;
  chapterId: number | string;
  chapterNumber: number;
  chapterPrice: number;
  chapterStatus: number;
  chapterTitle: string;
  storyId: number | string;
  storyTitle: string;
  volumeId: number | string;
}

export interface IReviewDetailChapterInfo {
  review: {
    chapters: IReviewChapterInfo;
    reviewer: IUser;
    chapterId: number | string;
    spellingError: boolean;
    lengthError: boolean;
    politicalContentError: boolean;
    distortHistoryError: boolean;
    secretContentError: boolean;
    offensiveContentError: boolean;
    unhealthyContentError: boolean;
    reviewContent: string;
  };
}

export interface IReviewChapterForm {
  chapterId: number | string;
  spellingError: boolean;
  lengthError: boolean;
  politicalContentError: boolean;
  distortHistoryError: boolean;
  secretContentError: boolean;
  offensiveContentError: boolean;
  unhealthyContentError: boolean;
  reviewContent: string;
}
