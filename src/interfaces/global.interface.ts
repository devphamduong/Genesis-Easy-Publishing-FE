import { ICategory } from "./category.interface";

export interface IApiResponse<T> {
  ec: number;
  em: string;
  dt: T;
}

export interface IReportOption {
  reportTypeId: number | string;
  reportTypeContent: string;
}

export interface IFilterOptions {
  cate: ICategory[];
  to: number;
  from: number;
  status: [
    done: {
      name: string;
      value: string | number;
    },
    writing: {
      name: string;
      value: string | number;
    }
  ];
}

export interface IPropsEPModal {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}
