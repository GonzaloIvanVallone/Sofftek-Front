import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import './ListProducts.css'
import { useDispatch, useSelector } from 'react-redux';

const ListProducts = () => {
    const allProducts = useSelector((state) => state.allProducts);
    return(
        <div className='container'>
            {allProducts.map((product, index) => (
                <Link to={`/product/${product.idProduct}`} key={index}>
                    <ProductCard product={product}></ProductCard>
                </Link>
            ))}
        </div>
    );
} ;

export default ListProducts;

