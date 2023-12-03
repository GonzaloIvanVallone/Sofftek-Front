import React from 'react';
import {NavBar} from '../NavBar/NavBar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {ProductCard} from '../ProductCard/ProductCard';
import {SearchBar} from '../SearchBar/SearchBar';
import './Home.scss';
import CategoryFilter from '../CategoryFilter/CategoryFilter';

const Home = () => {
  const filteredProducts = useSelector((state) => state.filteredProducts);
  
  
  const handleClick = (e) => {
    if (e.shiftKey) {
      window.open(`/product/${e.idProduct}`, '_blank');
      e.preventDefault(); // Evita que el enlace se abra en la ventana actual
    }
  };

    
  return (
    <div className='container-fluid mb-2'>
      <NavBar/>
      <SearchBar/>
      <CategoryFilter/>
      <div className='container'>
        {
          filteredProducts?.map((e)=>{
          return(
            <Link className='link'  
            onClick={handleClick(e.idProduct)}
            to={`/product/${e.idProduct}`} 
            key={e.idProduct}
            >
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