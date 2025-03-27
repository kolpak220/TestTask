import { Flex, Layout, Button, Form, Input, InputNumber, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { layoutStyle, headerStyle, contentStyle } from "./antdStyles";
import { BackwardFilled } from "@ant-design/icons";
import { RootState, useAppDispatch } from "../../redux/store";
import { plusItem } from "../../redux/slices/coinslice/slice";
import { useSelector } from "react-redux";
import { FindCoin } from "../../redux/slices/coinslice/selectors";
import { useState } from "react";

const { Header, Content } = Layout;

const CreateProduct: React.FC = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [id, setId] = useState("");

  const exist = useSelector((state: RootState) => FindCoin(state, id));

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

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
                const fields = form.getFieldsValue();
                if (exist) {
                  messageApi.open({
                    type: "error",
                    content: "Coin on this ID already exist",
                  });
                  form.scrollToField("id");
                  form.setFieldValue("id", "");
                  form.focusField("id");
                } else {
                  dispatch(plusItem(fields));
                  messageApi.open({
                    type: "success",
                    content: "Coin added, back to Home page in 3..2...",
                  });
                  setTimeout(() => {
                    navigate("/products");
                  }, 3000);
                }
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
              >
                <Form.Item name="id" label="ID" rules={[{ required: true }]}>
                  <Input
                    onChange={(e) => setId(e.target.value)}
                    placeholder="bitcoin"
                  />
                </Form.Item>
                <Form.Item
                  name="symbol"
                  label="Symbol"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="BTC" />
                </Form.Item>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Bitcoin" />
                </Form.Item>
                <Form.Item
                  name="price"
                  label="Price (USD.)"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    suffix="$"
                    placeholder="87548.31"
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item
                  name="icon"
                  label="Icon URL"
                  rules={[
                    { type: "url", warningOnly: true },
                    { type: "string", min: 6 },
                  ]}
                >
                  <Input placeholder="https://imgur.." />
                </Form.Item>

                <Form.Item>
                  <Flex gap="small">
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Flex>
                </Form.Item>
              </Form>
            </Form.Provider>
          </Content>
        </Layout>
      </Flex>
    </>
  );
};

export default CreateProduct;
