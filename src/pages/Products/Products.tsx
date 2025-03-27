import React, { useCallback, useState } from "react";
import {
  Button,
  Col,
  Empty,
  Flex,
  Layout,
  Pagination,
  PaginationProps,
  Radio,
  RadioChangeEvent,
  Result,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import { contentStyle, headerStyle, layoutStyle } from "./antdStyles";
import CoinCard from "../../components/CoinCard";
import { useSelector } from "react-redux";
import { SelectCoins } from "../../redux/slices/coinslice/selectors";
import { Input } from "antd";
import { Link } from "react-router-dom";
import { Coin } from "../../redux/slices/coinslice/types";

const { Header, Content } = Layout;

const perPage = 5;

const Products: React.FC = () => {
  const items = useSelector(SelectCoins);
  const [sort, setSort] = useState<boolean | undefined>(undefined);
  const [direction, setD] = useState<boolean>(true);
  const [current, setCurrent] = useState(1);
  const [filter, setFilter] = useState<"all" | "liked">("all");
  const [search, setSearch] = useState<string>("");

  const handleFilterChange = (e: RadioChangeEvent) => {
    setFilter(e.target.value);
  };

  if (!items) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
      />
    );
  }

  const renderItems = useCallback(() => {
    if (items.length === 0) {
      return <Spin size="large" fullscreen />;
    }
    if (filter == "liked" && !items.find((e) => e.liked == true)) {
      return (
        <Empty
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 10,
            marginTop: "20vh",
          }}
          description={
            <Typography.Text>
              Doesn't seem to have any favourited items
            </Typography.Text>
          }
        />
      );
    }
    let sorted: Coin[] = [...items];

    if (sort) {
      if (direction) {
        sorted = sorted.sort((a, b) => a.price - b.price);
      } else {
        sorted = sorted.sort((a, b) => b.price - a.price);
      }
    } else if (sort == false) {
      if (direction) {
        sorted = sorted.sort((a, b) => a.symbol.localeCompare(b.symbol));
      } else {
        sorted = sorted.sort((a, b) => b.symbol.localeCompare(a.symbol));
      }
    }

    const startSlice = (current - 1) * perPage;
    const shallow =
      search || filter == "liked"
        ? sorted
        : sorted.slice(startSlice, startSlice + perPage);
    const rnd = shallow.map((v) => {
      if (!v.liked && filter === "liked") {
        return;
      }

      if (
        search &&
        ![
          v.id.toLowerCase(),
          v.name.toLowerCase(),
          v.symbol.toLowerCase(),
        ].some((str) => str.includes(search.toLowerCase()))
      ) {
        return;
      }
      return (
        <Col
          key={v.id}
          className="gutter-row transition duration-100 ease-in-out hover:-translate-y-0.5"
        >
          <CoinCard
            icon={v.icon}
            name={v.name}
            price={v.price}
            id={v.id}
            liked={v.liked}
            symbol={v.symbol}
          />
        </Col>
      );
    });
    return rnd;
  }, [items, filter, search, current, direction, sort]);
  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };
  return (
    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <div className="w-full flex">
            <div>
              <Radio.Group value={filter} onChange={handleFilterChange}>
                <Radio.Button value="all">All</Radio.Button>
                <Radio.Button value="liked">Favourites</Radio.Button>
              </Radio.Group>
            </div>
            <div className="ml-2">
              <Select
                allowClear
                style={{ width: 120 }}
                onChange={(e) => setSort(e)}
                placeholder="Sort"
                options={[
                  { value: false, label: "Alphabetic" },
                  { value: true, label: "Price" },
                ]}
              />
            </div>
            <div className="ml-2">
              <Select
                defaultValue={true}
                style={{ width: 100 }}
                onChange={(e) => setD(e)}
                options={[
                  { value: true, label: "(ASC)" },
                  { value: false, label: "(DESC)" },
                ]}
              />
            </div>
            <div className="ml-2">
              <Input
                placeholder="Search..."
                allowClear
                onChange={(e) => setSearch(e.target.value)}
              />{" "}
            </div>
            <div className="ml-2">
              <Link to="/create-product">
                <Button color="default" variant="outlined">
                  Add asset
                </Button>
              </Link>
            </div>
          </div>
        </Header>
        <Content style={contentStyle}>
          <Row
            className="justify-center transition-all duration-300 ease-in-out"
            gutter={[16, 24]}
          >
            {renderItems()}
          </Row>
          {search || filter == "liked" ? null : (
            <Pagination
              style={{
                marginTop: 50,
                backgroundColor: "#fff",
                padding: 5,
                borderRadius: 5,
                width: "fit-content",
              }}
              current={current}
              onChange={onChange}
              defaultPageSize={perPage}
              total={items.length}
            />
          )}
        </Content>
      </Layout>
    </Flex>
  );
};

export default Products;
