import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Products from "./pages/Products/Products";
import { useAppDispatch } from "./redux/store";
import { fetchCoins } from "./redux/slices/coinslice/asyncActions";
import Info from "./pages/Info/Info";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import EditProduct from "./pages/EditProduct/EditProduct";
import { Spin } from "antd";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pathname == "/") {
      navigate("products");
    }
    dispatch(fetchCoins());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Spin size="large" fullscreen />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<Info />} />
      <Route path="/create-product" element={<CreateProduct />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
    </Routes>
  );
}

export default App;
