import axios from "../utils/axios-customize";
import { IApiResponse } from "../interfaces/global.interface";

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

export const buyStory = (id: number | string): Promise<IApiResponse<null>> => {
  return axios.post(`transaction/add_transaction_buy_story?storyId=${id}`);
};
