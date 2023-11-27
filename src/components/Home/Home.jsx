import React from 'react';
import ListadoProductos from '../ProductCard/ListProducts';
import NavBar from '../NavBar/NavBar';


const Home = ({ productList }) => {
    return (
      <div>
        {/* ... Otro contenido de Home ... */}
        <NavBar/>
        <ListadoProductos productList={productList} />
      </div>
    );
  };
  
  export default Home;