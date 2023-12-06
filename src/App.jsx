import { Home } from "./components/Home/Home";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductDetail } from "./components/ProductDetail/ProductDetail";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { getAllProducts } from "./redux/actions/indexActions";
import { useDispatch } from "react-redux";
import { ForgotPassword } from "./components/ForgotPassword/ForgotPassword";
import { NewPassword } from "./components/ForgotPassword/NewPassword";
import { getCart } from "./redux/actions/indexActions";
import { Cart } from "./components/Cart/Cart";
import { Paymentform } from "./components/BuyForm/PaymentForm";
import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";
import { NotLoggin } from "./components/NotLoggin/NotLoggin";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <BrowserRouter>
      <div className="App container-fluid">
        {/* <NavBar /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path={"/register"} element={<Register />} />
          <Route exact path={"/login"} element={<Login />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path={"/cart"} element={<Cart />}></Route>
          <Route exact path={"/password"} element={<ForgotPassword />} />
          <Route
            exact
            path={"/password/new/:token"}
            element={<NewPassword />}
          />
          <Route exact path={"/Buy"} element={<Paymentform />} />
          <Route exact path={"/NotLoggin"} element={<NotLoggin />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
