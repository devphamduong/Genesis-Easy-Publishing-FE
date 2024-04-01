import { EStoryStatusLabel } from "../enums/story.enum";
import { ICategory } from "./category.interface";
import { IAuthor } from "./story.interface";

export interface IApiResponse<T> {
  ec: number;
  em: string;
  dt: T;
}

export interface IApiResponsePagination<T> {
  ec: number;
  em: string;
  dt: {
    total: number;
    totalPage: number;
    current: number;
    pageSize: number;
    list: T[];
  };
}

export interface IReportOption {
  reportTypeId: number | string;
  reportTypeContent: string;
}

export interface IFilterOptions {
  cate: ICategory[];
  author: IAuthor[];
  to: number;
  from: number;
  status: {
    name: EStoryStatusLabel;
    value: string | number;
  }[];
}

export interface IPropsEPModal {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}
