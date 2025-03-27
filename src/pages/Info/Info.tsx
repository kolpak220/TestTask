import { Button, Flex, Layout, Result, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { Coin } from "../../redux/slices/coinslice/types";
import { Link, useParams } from "react-router-dom";
import { layoutStyle, headerStyle, contentStyle } from "./antdStyles";
import { useSelector } from "react-redux";
import { FindCoin } from "../../redux/slices/coinslice/selectors";
import { RootState } from "../../redux/store";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import fetchCoin from "../../utils/fetchCoin";
import { BackwardFilled } from "@ant-design/icons";
import CoinDisplay from "../../components/CoinDisplay";

const { Header, Content } = Layout;


const Info: React.FC = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState<false | Coin>();
  const [items, setItems] = useState<DescriptionsProps["items"]>();

  if (!id) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
      />
    );
  }

  const exist = useSelector((state: RootState) => FindCoin(state, id));
  useEffect(() => {
    async function f(id: string) {
      try {
        const res = await fetchCoin(id);
        if (!res) {
          setCoin(false);
        } else {
          setCoin(res.data);
        }
      } catch {
        setCoin(false);
      }
    }

    if (exist) {
      setCoin(exist);
    } else {
      f(id);
    }
    return setItems(undefined);
  }, []);

  useEffect(() => {
    if (coin) {
      setItems(
        Object.entries(coin).map(([key, value]) => {
          if (value === undefined) {
            return {
              label: key,
              children: <div key={key}>{typeof value}</div>,
            };
          }
          if (value.toString().includes("http")) {
            return {
              label: key,
              children: (
                <Typography.Paragraph copyable>{value}</Typography.Paragraph>
              ),
            };
          }
          if (typeof value === "boolean") {
            return {
              label: key,
              children: <div key={key}>{value ? "true" : "false"}</div>,
            };
          }
          return {
            label: key,
            children: <div key={key}>{value}</div>,
          };
        })
      );
    }
  }, [coin]);

  if (coin == false) {
    return (
      <Result
        status="404"
        title="404"
        subTitle={`Can't find target "${id}"`} 
      />
    );
  } else if (coin === undefined) {
    return <Spin tip="Loading" size="large" fullscreen></Spin>;
  }
  return (
    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <div className="w-full flex">
            <div>
              <Link to="/products">
                <Button type="default" icon={<BackwardFilled />}>
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </Header>
        <Content style={contentStyle}>
          {items && (
            <Descriptions
              bordered
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
              }}
              title={
                <CoinDisplay
                  icon={coin.icon}
                  name={coin.name}
                  symbol={coin.symbol}
                />
              }
              items={items}
            />
          )}
        </Content>
      </Layout>
    </Flex>
  );
};

export default Info;
