import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

import Login from "./routes/log-reg/Login";
import Register from "./routes/log-reg/Register";
import Navbar from "./components/navigation/Navbar";
import OrderList from "./routes/order-list/OrderList";
import Order from "./routes/order/Order";
import ProductList from "./routes/product-list/ProductList";
import Product from "./routes/product/Product";
import AddProduct from "./routes/add-product/AddProduct";
import NotFound from "./routes/NotFound";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/user" element={<PrivateRoute />}>
          {/* Navbar is on PrivateRoute.jsx */}
          <Route index element={<OrderList />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="order/:id" element={<Order />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="addproduct" element={<AddProduct />} />
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
