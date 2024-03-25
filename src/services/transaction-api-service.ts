import axios from "../utils/axios-customize";
import { IApiResponse } from "../interfaces/global.interface";
import {
  IDataTransactionBuyChapters,
  IInformationBuyChapters,
  IResponseTransactionBuyChapters,
} from "../interfaces/transaction.interface";

export const VNPayTopUp = (data: {
  requiredAmount: number;
}): Promise<IApiResponse<{ paymentUrl: string }>> => {
  return axios.post(`transaction/vnpay_request`, {
    ...data,
  });
};

export const momoTopUp = (data: {
  requiredAmount: number;
}): Promise<IApiResponse<{ paymentUrl: string }>> => {
  return axios.post(`transaction/momo_request`, {
    ...data,
  });
};

export const addTransactionTopUp = (
  amount: number
): Promise<IApiResponse<{ amount: number }>> => {
  return axios.post(`transaction/top_up?amount=${amount}`);
};

export const getTransactionHistory = (
  page: number,
  pageSize: number
): Promise<IApiResponse<{ paymentUrl: string }>> => {
  return axios.get(
    `transaction/transaction_history?page=${page}&pageSize=${pageSize}`
  );
};

export const buySingleChapter = (
  id: number | string
): Promise<IApiResponse<null>> => {
  return axios.post(`transaction/add_transaction_buy_chapter?chapterId=${id}`);
};

export const buyChapters = (
  start: number,
  end: number,
  id: number | string
): Promise<IApiResponse<IResponseTransactionBuyChapters>> => {
  return axios.post(
    `transaction/add_transaction_buy_many_chapters?chapterStart=${start}&chapterEnd=${end}&storyId=${id}`
  );
};

export const buyStory = (id: number | string): Promise<IApiResponse<null>> => {
  return axios.post(`transaction/add_transaction_buy_story?storyId=${id}`);
};

export const getTransactionBuyMultipleChapters = (
  start: number,
  end: number,
  id: number | string
): Promise<IApiResponse<IDataTransactionBuyChapters>> => {
  return axios.get(
    `transaction/get_transaction_buy_many_chapters?chapterStart=${start}&chapterEnd=${end}&storyId=${id}`
  );
};

export const getInformationBuyMultipleChapters = (
  id: number | string
): Promise<IApiResponse<IInformationBuyChapters>> => {
  return axios.get(`transaction/get_information_to_buy_chapters?storyId=${id}`);
};
