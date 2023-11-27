import './App.css';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import ProductDetail from './components/ProductDetail/ProductDetail';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getAllProducts} from "./redux/actions/indexActions";
import { useDispatch, useSelector } from 'react-redux';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  
  return (
    <BrowserRouter> 
      <div className="App">
        <Routes> 
        <Route
            exact
            path="/"
            element={<Home/>}
          />
          <Route exact path={'/register'} element={<Register/>}/>
          <Route exact path={'/login'} element={<Login/>}/>
          {/* <Route exact path={'/navbar'} element={<NavBar/>}/> */}
          <Route path="/product/:id" element={<ProductDetail/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
