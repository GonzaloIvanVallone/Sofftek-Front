import React from 'react';
import {NavBar} from '../NavBar/NavBar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {ProductCard} from '../ProductCard/ProductCard';
import {SearchBar} from '../SearchBar/SearchBar';
import './Home.scss';

const Home = () => {
  const filteredProducts = useSelector((state) => state.filteredProducts);

    
  return (
    <div className='container-fluid mb-2'>
      <NavBar/>
      <SearchBar/>
      <div className='container'>
        {
          filteredProducts?.map((e)=>{
          return(
            <Link className='link' to={`/product/${e.idProduct}`} key={e.idProduct}>
              <ProductCard idproduct={e.idProduct} productImg={e.productImg} productName={e.productName} productPrice={e.productPrice}  />
            </Link>
            )
          })
        }
      </div>
    </div>
  );
};
  
export default Home;