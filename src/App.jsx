import Home from "./components/Home/Home";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetail from './components/ProductDetail/ProductDetail';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.scss";
import {getAllProducts} from "./redux/actions/indexActions";
import { useDispatch } from 'react-redux';
import Carrito from './components/Cart/Cart';
import { ForgotPassword} from "./components/ForgotPassword/ForgotPassword"
import { NewPassword} from "./components/ForgotPassword/NewPassword"
import { getCart } from "./redux/actions/indexActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    // Llama a la acción para obtener el carrito al cargar el componente
    dispatch(getCart());
  }, []);

  return (
    <BrowserRouter>

      <div className="App container-fluid">
        <Routes> 
        <Route
            exact
            path="/"
            element={<Home/>}
          />
          <Route exact path={'/register'} element={<Register/>}/>
          <Route exact path={'/login'} element={<Login/>}/>
          <Route path="/product/:id" element={<ProductDetail/>} />
          <Route path="/cart" element={<Carrito/>}></Route>
          <Route exact path={"/password"} element={<ForgotPassword />} />
          <Route exact path={"/password/new"} element={<NewPassword/>}/>{/*test only*/}
          <Route exact path={"/password/new/:token"} element={<NewPassword/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
