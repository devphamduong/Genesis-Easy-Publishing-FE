import { FC } from "react";
import "./EPCondition.scss";
import { Card } from "antd";

interface IProps {}

const EPCondition: FC<IProps> = (props: IProps) => {
  return (
    <>
      <Card title="Một số điều kiện cần lưu ý:" size="small">
        <ol type="1">
          <li>
            <strong>Tử Linh Thạch</strong> (TLT) là đơn vị tiền tệ ảo chỉ lưu
            hành trong The Genesis.
          </li>
          <li>
            TLT chỉ có thể dùng để mua truyện VIP, ủng hộ (donate) cho tác giả,
            dịch giả.
          </li>
          <li>
            <strong>Giá trị quy đổi</strong> so với VND là do The Genesis quy
            định, báo trước mỗi khi bạn nạp tiền.
          </li>
          <li>
            The Genesis chỉ cộng TLT cho bạn chỉ khi nào chúng tôi chắc chắn
            rằng đã nhận được thanh toán của bạn.
          </li>
          <li>
            Một khi đã quy đổi thành TLT, The Genesis sẽ không hoàn lại với bất
            cứ lý do nào.
          </li>
          <li>
            Các khoản phí từ cổng thanh toán, ngân hàng được The Genesis thông
            báo rõ ràng để bạn biết trước.
          </li>
          <li>
            Nếu tài khoản của bạn bị giam vì vi phạm nội quy, The Genesis vẫn
            giữ nguyên số TLT bạn đã mua, nhưng không thể sử dụng trong thời hạn
            bị giam.
          </li>
        </ol>
      </Card>
    </>
  );
};

export default EPCondition;
