import axios from "../utils/axios-customize";
import {
  IApiResponse,
  IApiResponsePagination,
} from "../interfaces/global.interface";
import {
  IDataTransactionBuyChapters,
  IInformationBuyChapters,
  IResponseTransactionBuyChapters,
  ITransactionHistory,
  IWalletInfor,
  IWithdrawForm,
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
): Promise<IApiResponsePagination<ITransactionHistory>> => {
  return axios.get(`transaction/history?page=${page}&pageSize=${pageSize}`);
};

export const buySingleChapter = (
  id: number | string
): Promise<IApiResponse<null>> => {
  return axios.post(`transaction/purchase_chapter?chapterId=${id}`);
};

export const buyChapters = (
  start: number,
  end: number,
  id: number | string
): Promise<IApiResponse<IResponseTransactionBuyChapters>> => {
  return axios.post(
    `transaction/purchase_many_chapters?chapterStart=${start}&chapterEnd=${end}&storyId=${id}`
  );
};

export const buyStory = (id: number | string): Promise<IApiResponse<null>> => {
  return axios.post(`transaction/purchase_story?storyId=${id}`);
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

export const getWallet = (): Promise<IApiResponse<IWalletInfor>> => {
  return axios.get(`transaction/wallet`);
};

export const sendWithdrawRequest = (
  data: IWithdrawForm
): Promise<IApiResponse<IWalletInfor>> => {
  return axios.post(`tickets/refund_send`, { ...data });
};
