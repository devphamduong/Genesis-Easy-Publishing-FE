export const getChapterNumber = (strChapter: string): number => {
  return +strChapter.split("-")[strChapter.split("-").length - 1];
};
