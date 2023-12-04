import React from 'react';
import { NavBar } from '../NavBar/NavBar';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { ProductCard } from '../ProductCard/ProductCard';
import { Button } from 'react-bootstrap';
import { SearchBar } from '../SearchBar/SearchBar';
import './Home.scss';
import CategoryFilter from '../CategoryFilter/CategoryFilter';

const Home = () => {
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const navigate = useNavigate();


  const handleBuyClick = (id, product) => {
    // Utiliza navigate para navegar a la ruta '/product/:id' y pasar el producto como estado de ubicación
    navigate("/product/" + id, { state: { product } });
  };


  return (
    <div className='container-fluid mb-2'>
      <NavBar />
      <SearchBar />
      <CategoryFilter />
      <div className='container'>
        {
          filteredProducts?.map((e) => {
            return (
              <Button
                key={e.idProduct}
                onClick={() => handleBuyClick(e.idProduct, e)}
              >
                <ProductCard idproduct={e.idProduct} productImg={e.productImg} productName={e.productName} productPrice={e.productPrice} />
              </Button>
            )
          })
        }
      </div>
    </div>
  );
};

export default Home;