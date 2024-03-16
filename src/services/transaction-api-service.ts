import axios from "../utils/axios-customize";
import { IApiResponse } from "../interfaces/global.interface";

export const VNPayTopUp = (data: {
  requiredAmount: number;
}): Promise<IApiResponse<{ paymentUrl: string }>> => {
  return axios.post(`transaction/vnpay_request`, {
    ...data,
  });
};

export const MomoTopUp = (data: {
  requiredAmount: number;
}): Promise<IApiResponse<{ paymentUrl: string }>> => {
  return axios.post(`transaction/momo_request`, {
    ...data,
  });
};
