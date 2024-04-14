import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { IExportPreview } from "../interfaces/story.interface";
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
  return str.replace(/<[^>]+>/g, "").replace(/[\n\r\t]+/g, " ");
};

export const dayjsFrom = (date: string): string => {
  return dayjs(date).fromNow();
};

export const exportHTMLToDoc = (
  content: string,
  story?: string,
  chapter?: string
) => {
  const header =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    "xmlns='http://www.w3.org/TR/REC-html40'>" +
    "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
  const footer = "</body></html>";
  const sourceHTML = header + content + footer;

  const source =
    "data:application/vnd.ms-word;charset=utf-8," +
    encodeURIComponent(sourceHTML);
  const fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  if (story) {
    fileDownload.download = `TRUYỆN ${story}.doc`;
    if (story && chapter) {
      fileDownload.download = `TRUYỆN ${story} CHƯƠNG ${chapter}.doc`;
    }
  }
  if (chapter) fileDownload.click();
  document.body.removeChild(fileDownload);
};

export const exportPDF = (title: string, content?: string) => {
  const head = window.document.querySelector("head")!.innerHTML;

  const windowWidth = window.screen.availWidth;
  const windowHeight = window.screen.availHeight;

  const windowPrint = window.open(
    "",
    "",
    `left=0,top=24,width=${windowWidth},height=${windowHeight},toolbar=0,scrollbars=0,status=0`
  );

  const replaceChars = {
    "/": "-",
    " ": "_",
  };

  let fileName = `Truyện ${title}`;
  fileName = fileName.replace(/[/\s/]/g, (m) => replaceChars[m]);

  windowPrint!.document.write(
    `<html>
        <head>
          <title>${fileName}</title>
          ${head}
          </head>
          <body>
            <div class="preview-print-wrapper">
              ${content || ""}
              </div>
          </body>
        </html>
          `
  );

  windowPrint!.document.close();
  windowPrint!.addEventListener("load", function load() {
    windowPrint!.focus();
    windowPrint!.print();
  });

  windowPrint!.addEventListener("afterprint", function afterPrint() {
    windowPrint!.close();
  });

  return;
};
