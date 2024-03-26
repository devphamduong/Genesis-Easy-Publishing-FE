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
