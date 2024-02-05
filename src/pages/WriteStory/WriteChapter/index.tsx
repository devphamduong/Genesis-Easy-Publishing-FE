import { FC, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import "./WriteChapter.scss";

interface IProps {}

const mdParser = new MarkdownIt(/* Markdown-it options */);

const WriteChapter: FC<IProps> = (props: IProps) => {
  const [contentMarkdown, setContentMarkdown] = useState<string>("");
  const [contentHTML, setContentHTML] = useState<string>("");

  const handleEditorChange = ({
    html,
    text,
  }: {
    html: string;
    text: string;
  }) => {
    setContentMarkdown(text);
    setContentHTML(html);
  };

  return (
    <MdEditor
      style={{ height: "300px" }}
      value={contentMarkdown}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
    />
  );
};

export default WriteChapter;
