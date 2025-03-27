import {
  EditOutlined,
  HeartOutlined,
  DeleteOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Card, Divider, Typography } from "antd";
import { useAppDispatch } from "../redux/store";
import { deleteItem, likeItem } from "../redux/slices/coinslice/slice";
import CoinDisplay from "./CoinDisplay";
import { Link, useNavigate } from "react-router-dom";

type vals = {
  id: string;
  symbol: string;
  icon: string;
  name: string;
  price: number;
  liked: boolean | undefined;
};

const CoinCard: React.FC<vals> = ({ icon, name, price, id, liked, symbol }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Card
      style={{ width: 250 }}
      actions={[
        <>
          {liked ? (
            <HeartFilled
              style={{ color: "hotpink", fontSize: "1.2rem" }}
              key="favourite"
              onClick={() => dispatch(likeItem(id))}
            />
          ) : (
            <HeartOutlined
              style={{ fontSize: "1.2rem" }}
              key="favourite"
              onClick={() => dispatch(likeItem(id))}
            />
          )}
        </>,
        <Link to={`/edit-product/${id}`}>
          <EditOutlined style={{ fontSize: "1.2rem" }} key="edit" />
        </Link>,
        <DeleteOutlined
          style={{ fontSize: "1.2rem" }}
          onClick={() => dispatch(deleteItem(id))}
          key="delete"
        />,
      ]}
    >
      <Link to={`/products/${id}`}>
        <CoinDisplay icon={icon} name={name} symbol={symbol} />
        <Divider />
        <Typography.Paragraph>
          ~ <b className="text-[1rem]">{price.toFixed(2)}</b> $
        </Typography.Paragraph>
      </Link>
    </Card>
  );
};

export default CoinCard;
