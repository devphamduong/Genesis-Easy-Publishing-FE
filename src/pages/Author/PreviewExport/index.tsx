import { FC, useEffect, useRef, useState } from "react";
// import "./PreviewExport.scss";
import { useLocation } from "react-router-dom";
import { IExportPreview } from "../../../interfaces/story.interface";
import { storyExportPreview } from "../../../services/author-api-service";
import { Flex, FloatButton } from "antd";
import { BsFiletypeDoc } from "react-icons/bs";
import EPExport from "../../../components/EP-Common/Export";

interface IProps {}

const PreviewExportPage: FC<IProps> = (props: IProps) => {
  const location = useLocation();
  const storyId: string = location?.state?.storyId;
  const [exportPreview, setExportPreview] = useState<IExportPreview>();
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (storyId) {
      getExportPreview();
    }
  }, [storyId]);

  const getExportPreview = async () => {
    const res = await storyExportPreview(storyId!);
    if (res && res.ec === 0) {
      setExportPreview(res.dt);
    }
  };

  return (
    <div className="export-preview-container">
      <div className="export-preview-content" ref={targetRef}>
        <div className="text-center story">
          <strong className="story-title fs-4">
            {exportPreview?.storyTitle}
          </strong>
        </div>
        {exportPreview &&
          exportPreview?.storyVolumes.length > 0 &&
          exportPreview?.storyVolumes.map((itemV) => {
            return (
              <div
                key={`volume-${itemV.volumeNumber}`}
                className="text-center volume"
              >
                <strong className="volume-title fs-4">
                  Tập {itemV.volumeNumber}: {itemV.volumeTitle}
                </strong>
                {itemV.volumeChapters.length > 0 &&
                  itemV?.volumeChapters.map((itemC) => {
                    return (
                      <div
                        key={`chapter-${itemC.chapterNumber}`}
                        className="text-start chapter"
                      >
                        <strong className="chapter-title fs-5">
                          Chương {itemC.chapterNumber}: {itemC.chapterTitle}
                        </strong>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: itemC.chapterContentHtml,
                          }}
                        />
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
      {targetRef && targetRef.current && (
        <Flex align="center" justify="center" className="mt-3">
          <button
            onClick={() => console.log(targetRef.current?.innerHTML + "")}
          >
            123
          </button>
          <EPExport
            customText="Xuất doc"
            contentToExport={
              "<p><strong>And Then There Were None</strong></p>\n<p><strong>Tập 1: Nine little boys</strong></p>\n"
            }
            storyTitle={exportPreview?.storyTitle}
          />
        </Flex>
      )}
      <FloatButton.Group shape="circle" type="primary">
        <FloatButton icon={<BsFiletypeDoc />} />
        <FloatButton.BackTop />
      </FloatButton.Group>
    </div>
  );
};

export default PreviewExportPage;
