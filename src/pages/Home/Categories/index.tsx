import { FC } from "react";
import { Col, Row } from "antd";
import { ICategory } from "../../../interfaces/category.interface";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getCategoryDetailURL } from "../../../shared/generate-navigate-url";
import { kFormatter } from "../../../shared/function";
import Loading from "../../../components/Loading";
import { PiDotsThreeCircleLight } from "react-icons/pi";

interface IProps {
  setIsOpenDrawer: (value: boolean) => void;
}

const Categories: FC<IProps> = (props: IProps) => {
  const { setIsOpenDrawer } = props;
  const categories: ICategory[] = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      <Row
        justify={"start"}
        align={"middle"}
        className="content-top-item rounded-3 content-top-item-left py-2 position-relative"
      >
        {categories && categories.length > 0 ? (
          categories?.slice(0, 14).map((item, index) => {
            return (
              <Col
                span={12}
                key={`cate-${item.categoryId}-${item.categoryName}`}
                onClick={() =>
                  navigate(
                    getCategoryDetailURL(item.categoryId, item.categoryName)
                  )
                }
              >
                <div className="d-flex align-items-center px-2 category gap-2">
                  <div className="icon">{item.icon ?? "O"}</div>
                  <div>
                    <strong className="name">{item.categoryName}</strong>
                    <div className="amount">
                      {kFormatter(item.storiesNumber!)}
                    </div>
                  </div>
                </div>
              </Col>
            );
          })
        ) : (
          <Col span={24} className="d-flex justify-content-center">
            <Loading />
          </Col>
        )}
        <div className="more-icon position-absolute bottom-0 end-0">
          <PiDotsThreeCircleLight
            className="pointer"
            onClick={() => setIsOpenDrawer(true)}
          />
        </div>
      </Row>
    </>
  );
};

export default Categories;
