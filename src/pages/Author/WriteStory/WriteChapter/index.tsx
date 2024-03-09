import { FC, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import "./WriteChapter.scss";

interface IProps {}

const mdParser = new MarkdownIt(/* Markdown-it options */);

const WriteChapterPage: FC<IProps> = (props: IProps) => {
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
    <div className="write-chapter-container my-3">
      <div className="write-chapter-content container">
        <MdEditor
          style={{ height: "300px" }}
          value={contentMarkdown}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
};

export default WriteChapterPage;
