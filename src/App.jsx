import { Home } from "./components/Home/Home";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductDetail } from "./components/ProductDetail/ProductDetail";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { getAllProducts, getAllUsers } from "./redux/actions/indexActions";
import { useDispatch } from "react-redux";
import { ForgotPassword } from "./components/ForgotPassword/ForgotPassword";
import { NewPassword } from "./components/ForgotPassword/NewPassword";
import { getCart, setLoggedIn } from "./redux/actions/indexActions";
import { Cart } from "./components/Cart/Cart";
import { Paymentform } from "./components/BuyForm/PaymentForm";
import { NotLoggin } from "./components/NotLoggin/NotLoggin";
import { Success } from "./components/success/success";
import { Failure } from "./components/Failure/Failure";
import { AdminNavbar } from "./components/AdminNavbar/AdminNavbar";
import Homedash from "./components/AdminNavbar/Homedash/Homedash";
import Userdash from "./components/AdminNavbar/Userdash/Userdash";
import Productdash from "./components/AdminNavbar/Productsdash/Productdash";
import Categorydash from "./components/AdminNavbar/Categorydash/Categorydash";
import Sales from "./components/AdminNavbar/Sales/Salesdash";
import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    // Al cargar el componente, verifica si hay un token en el localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // Si hay un token, actualiza el estado isLoggedIn a true
      dispatch(setLoggedIn());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App container-fluid">
        
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
          <Route exact path={"/Success"} element={<Success />} />
          <Route exact path={"/Failure"} element={<Failure />} />
          <Route path="/dashboard/*" element={<AdminNavbar />}>
            <Route index element={<Homedash />} />
            <Route index path="homedash" element={<Homedash />} />
            <Route path="userdash" element={<Userdash />} />
            <Route path="productdash" element={<Productdash />} />
            <Route path="categorydash" element={<Categorydash />} />
            <Route path="sales" element={<Sales />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
