export interface IUpdateBalanceAction {
  updateAction: string;
  amount: number;
}

export interface IDataTransactionChapters {
  chapter_buy: number;
  amount: number;
  user_chapter: number;
  transaction: {
    transactionId: number;
    walletId: number;
    storyId: number;
    chapterId: number | string;
    amount: number;
    fundBefore: number;
    fundAfter: number;
    refundBefore: number;
    refundAfter: number;
    transactionTime: string;
    status: boolean;
    description: string;
  };
}
