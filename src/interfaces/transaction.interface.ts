export interface IUpdateBalanceAction {
  updateAction: string;
  amount: number;
}

export interface IInformationBuyChapters {
  chapter_story_max: number;
  user_chapter: number;
  user_wallet: number;
}

export interface IDataTransactionBuyChapters {
  number_chapter_buy: number;
  amount: number;
  balance: number;
}

export interface IResponseTransactionBuyChapters {
  chapter_buy: number;
  amount: number;
  fund: number;
  user_chapter: number;
}

export interface IWalletInfor {
  walletId: number;
  userId: number;
  fund: number;
  refund: number;
  amount_received: number;
  amount_spent: number;
  amount_top_up: number;
  amount_withdrawn: number;
}

export interface ITransactionHistory {
  amount: number;
  chapterTitle: string;
  description: string;
  fundAfter: number;
  fundBefore: number;
  refundAfter: number;
  refundBefore: number;
  status: boolean;
  storyTitle: number;
  transactionId: number;
  transactionTime: string;
}

export interface IWithdrawForm {
  bankId: string;
  bankAccount: string;
  amount: string;
}
