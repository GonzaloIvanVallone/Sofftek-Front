import React from "react";
import { NavBar } from "../NavBar/NavBar";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ProductCard } from "../ProductCard/ProductCard";
import { SearchBar } from "../SearchBar/SearchBar";
import "./Home.scss";

const Home = () => {
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const navigate = useNavigate();

  const handleBuyClick = (id, product) => {
    // Utiliza navigate para navegar a la ruta '/product/:id' y pasar el producto como estado de ubicación
    navigate("/product/" + id, { state: { product } });
  };

  return (
    <div className="container-fluid mb-2">
      <NavBar />
      <SearchBar />
      <div className="container">
        {filteredProducts?.map((e) => {
          return (
            <button
              className="buttonCard btn btn-success"
              onClick={() => handleBuyClick(e.idProduct, e)}
            >
              <ProductCard
                idproduct={e.idProduct}
                productImg={e.productImg}
                productName={e.productName}
                productPrice={e.productPrice}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
