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
  chapter_buy: {
    chapterNumber: number;
  }[];
  amount: number;
  number_chapter_buy: number;
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

export interface IResponseTransactionBuyChapters {
  chapter_buy: number;
  amount: number;
  fund: number;
  user_chapter: number;
}
