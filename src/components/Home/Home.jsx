import React from 'react';
import ListadoProductos from '../ProductCard/ListProducts';
import NavBar from '../NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';


const Home = () => {
    const allProducts = useSelector((state) => state.allProducts);

    console.log(allProducts);
    return (
      <div>
        <NavBar/>
        <div className='container'>
          {
            allProducts?.map((e)=>{
            return(
                <Link  to={`/product/${e.idProduct}`}>
                    <ProductCard product={e} key={e.idProduct}/>
                </Link>
                )
              })
          }
        </div>
      </div>
    );
  };
  
  export default Home;