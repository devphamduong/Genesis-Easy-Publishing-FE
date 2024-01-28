export const kFormatter = (num: number): number | string => {
  const absNum = Math.abs(num);
  if (absNum > 999) {
    const sign = Math.sign(num);
    const formattedNum = (absNum / 1000).toFixed(1);
    return `${sign < 0 ? "-" : ""}${formattedNum}k`;
  } else {
    return num;
  }
};
