import { Avatar, Flex, Typography } from "antd";

type vals = Record<string, string>;
const CoinDisplay: React.FC<vals> = ({ icon, name, symbol = null }) => {
  return (
    <Flex className="h-10" style={{ alignItems: "center" }}>
      <Avatar src={icon} size={40} style={{ marginRight: 10 }} />
      <Typography.Title level={4} style={{ margin: 0 }}>
        {symbol && `(${symbol})`}{" "}
        <span className="text-gray-500">{`${name.substring(0, 9)}${
          name.length > 9 ? ".." : ""
        }`}</span>
      </Typography.Title>
    </Flex>
  );
};

export default CoinDisplay;
