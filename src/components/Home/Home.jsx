import React from 'react';
import {NavBar} from '../NavBar/NavBar';
import { useSelector, useDispatch  } from 'react-redux';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {ProductCard} from '../ProductCard/ProductCard';
import {SearchBar} from '../SearchBar/SearchBar';
import { Pagination } from '../Pagination/Pagination';
import './Home.scss';

const Home = () => {
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const pageSize = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const indexLastProduct = currentPage * pageSize;
  const indexFirstProduct = indexLastProduct - pageSize;
  const currentProducts = filteredProducts.slice(indexFirstProduct, indexLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const handlePagination = (newPage) => {
    setCurrentPage(newPage);
  };
    
  return (
    <div className='container-fluid mb-2'>
      <NavBar/>
      <SearchBar/>
      <div className='divPagination'>
        <Pagination pageSize={pageSize} totalProducts={filteredProducts.length} page={currentPage} pagination={handlePagination} />
      </div>
      <div className='container'>
        {
          currentProducts?.map((e)=>{
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