import { FC } from "react";
import "./ReviewStory.scss";
import { Button, Checkbox } from "antd";
import TextArea from "antd/es/input/TextArea";

interface IProps {}

const ReviewStoryPage: FC<IProps> = (props: IProps) => {
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  return (
    <>
      <div className="rate-area">
        <Checkbox.Group
          onChange={onChange}
          className="d-flex flex-column gap-2"
        >
          <Checkbox value="A">Không chứa lỗi chính tả.</Checkbox>
          <Checkbox value="A">
            Độ dài chương không quá dài hoặc quá ngắn.
          </Checkbox>
          <Checkbox value="A">
            Không chứa nội dung tuyên truyền chống Nhà nước Cộng hòa xã hội chủ
            nghĩa Việt Nam; phá hoại khối đại đoàn kết toàn dân tộc; truyền bá
            tư tưởng phản động; kích động chiến tranh xâm lược, gây hận thù giữa
            các dân tộc và nhân dân các nước.
          </Checkbox>
          <Checkbox value="A">
            Không chứa nội dung xuyên tạc sự thật lịch sử, phủ nhận thành tựu
            cách mạng; xúc phạm dân tộc, danh nhân, anh hùng dân tộc; không thể
            hiện hoặc thể hiện không đúng chủ quyền quốc gia.
          </Checkbox>
          <Checkbox value="A">
            Không chứa nội dung tiết lộ bí mật nhà nước, bí mật đời tư của cá
            nhân và bí mật khác do pháp luật quy định.
          </Checkbox>
          <Checkbox value="A">
            Không chứa nội dung vu khống, xúc phạm uy tín của cơ quan, tổ chức
            và danh dự, nhân phẩm của cá nhân.
          </Checkbox>
          <Checkbox value="A">
            Không chứa nội dung nội dung kích động bạo lực, tuyên truyền lối
            sống dâm ô, đồi trụy, hành vi tội ác, tệ nạn xã hội, mê tín dị đoan,
            phá hoại thuần phong mỹ tục.
          </Checkbox>
        </Checkbox.Group>
        <div className="my-3 w-50 mx-auto">
          <TextArea placeholder="Nhận xét của bạn" autoSize={{ minRows: 3 }} />
        </div>
        <div className="text-center">
          <Button>Gửi nhận xét</Button>
        </div>
      </div>
    </>
  );
};

export default ReviewStoryPage;
