import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import './ListProducts.css'


const ListProducts = ({productList}) => {
    return(
        <div className='container'>
            {productList.map((product, index) => (
                <Link to={`/product/${product.idProduct}`} key={index}>
                    <ProductCard product={product}></ProductCard>
                </Link>
            ))}
        </div>
    );
} ;

export default ListProducts;

