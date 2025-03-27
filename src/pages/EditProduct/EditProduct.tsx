import {
  Button,
  Divider,
  Flex,
  FloatButton,
  Form,
  Input,
  InputNumber,
  Layout,
  message,
  Result,
  Space,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FindCoin } from "../../redux/slices/coinslice/selectors";
import { Coin } from "../../redux/slices/coinslice/types";
import { RootState, useAppDispatch } from "../../redux/store";
import { plusItem } from "../../redux/slices/coinslice/slice";
import { layoutStyle, headerStyle, contentStyle } from "../Products/antdStyles";
import { BackwardFilled, DownOutlined, UpOutlined } from "@ant-design/icons";
import CoinDisplay from "../../components/CoinDisplay";

const { Header, Content } = Layout;

const EditProduct: React.FC = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [coin, setCoin] = useState<false | Coin>();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    if (exist) {
      setCoin(exist);
    } else {
      setCoin(false);
    }
  }, []);

  if (coin == false) {
    return (
      <Result status="404" title="404" subTitle={`Can't find target "${id}"`} />
    );
  } else if (coin === undefined) {
    return <Spin tip="Loading" size="large" fullscreen></Spin>;
  }

  return (
    <>
      {contextHolder}
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
            <Form.Provider
              onFormFinish={() => {
                setDisabled(true);
                const fields = form.getFieldsValue();
                dispatch(plusItem(fields));
                messageApi.open({
                  type: "success",
                  content: "Coin edited, back to Home page in 3..2...",
                });
                setTimeout(() => {
                  navigate("/products");
                }, 3000);
              }}
            >
              <Form
                form={form}
                scrollToFirstError={{
                  behavior: "instant",
                  block: "end",
                  focus: true,
                }}
                layout="vertical"
                style={{
                  margin: "auto",
                  backgroundColor: "#fff",
                  padding: 20,
                  maxWidth: 600,
                  borderRadius: 10,
                }}
                initialValues={coin}
              >
                <Form.Item>
                  <CoinDisplay
                    icon={coin.icon}
                    symbol={coin.symbol}
                    name={coin.name}
                  />
                </Form.Item>
                <Divider />
                {Object.entries(coin).map(([key, value]) => {
                  if (key == "id") {
                    return (
                      <Form.Item key={key} name={key} label="ID">
                        <Input readOnly />
                      </Form.Item>
                    );
                  }
                  return (
                    <Form.Item
                      key={key}
                      name={key}
                      label={key}
                      rules={[{ required: true }]}
                    >
                      {typeof value == "number" ? (
                        <InputNumber style={{ width: "100%" }} />
                      ) : (
                        <Input />
                      )}
                    </Form.Item>
                  );
                })}
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                  <Space>
                    <Button
                      disabled={disabled}
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                    <Button disabled={disabled} htmlType="reset">
                      reset
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Form.Provider>
            <FloatButton
              style={{ left: 50, bottom: 100 }}
              icon={<UpOutlined />}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
            <FloatButton
              style={{ left: 50 }}
              icon={<DownOutlined />}
              onClick={() =>
                window.scrollTo({ top: 100000, behavior: "smooth" })
              }
            />
          </Content>
        </Layout>
      </Flex>
    </>
  );
};

export default EditProduct;
