import './App.css';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import ProductDetail from './components/ProductDetail/ProductDetail';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const getProducts = async () => {
  try {
    const request = await fetch("http://localhost:8080/api/v1/product/list");
    console.log(request.status)
    if(request.status !== 200) throw request;
    const response = await request.json();
    return response;
  } catch (error) {
    throw error;
  }
};

function App() {

  const [products, setProducts] = useState([]);

  const searchProducts = async() => {
    try {
      const rest = await getProducts();
      setProducts(rest);
    } catch (error) {
      setError(error.status);
    }
  };

  useEffect(() => {
    searchProducts();
  }, []);
  
  return (
    <BrowserRouter> 
      <div className="App">
        <Routes> 
        <Route
            exact
            path="/"
            element={<Home productList={products} />}
          />
          <Route exact path={'/register'} element={<Register/>}/>
          <Route exact path={'/login'} element={<Login/>}/>
          <Route exact path={'/navbar'} element={<NavBar/>}/>
          <Route path="/product/:id" element={<ProductDetail productList={products} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
