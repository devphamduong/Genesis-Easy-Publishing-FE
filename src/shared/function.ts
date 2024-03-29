import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

export const kFormatter = (num: number): number | string => {
  const absNum = Math.abs(num);
  if (absNum > 999) {
    const sign = Math.sign(num);
    const formattedNum = absNum / 1000;
    return `${sign < 0 ? "-" : ""}${formattedNum}k`;
  } else {
    return num;
  }
};

export const slugify = (str: string): string => {
  return String(str)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const getPlainTextFromHTML = (str: string): string => {
  return str.replace(/<[^>]+>/g, "");
};

export const dayjsFrom = (date: string): string => {
  return dayjs(date).fromNow();
};
