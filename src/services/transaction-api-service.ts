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
