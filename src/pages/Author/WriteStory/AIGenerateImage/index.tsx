import { FC, useState } from "react";
// import './AIGenerateImage.scss'

interface IProps {}

const AIGenerateImage: FC<IProps> = (props: IProps) => {
  return (
    <div className="app-main">
      <>
        <h2>Tạo ảnh bìa cho truyện bằng AI</h2>

        <iframe
          src="https://designer.microsoft.com/image-creator"
          width="100%"
          height="600px"
        />
      </>
    </div>
  );
};

export default AIGenerateImage;
