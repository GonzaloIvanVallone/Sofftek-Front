import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { NavBar } from "../NavBar/NavBar";
import { Footer } from "../Footer/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../ProductCard/ProductCard";
import { SearchBar } from "../SearchBar/SearchBar";
import { Pagination } from "../Pagination/Pagination";
import "./Home.scss";
import { CategoryFilter } from "../CategoryFilter/CategoryFilter";

export const Home = () => {
  const allProducts = useSelector((state) => state.allProducts);
  const navigate = useNavigate();

  const handleBuyClick = (id, product) => {
    // Utiliza navigate para navegar a la ruta '/product/:id' y pasar el producto como estado de ubicación
    navigate("/product/" + id, { state: { product } });
  };

  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexLastProduct = currentPage * pageSize;
  const indexFirstProduct = indexLastProduct - pageSize;
  const currentProducts = allProducts.slice(
    indexFirstProduct,
    indexLastProduct
  );
  const totalPages = Math.ceil(allProducts.length / pageSize);

  const handlePagination = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleFilter = () => {
    setCurrentPage(1);
  };

  return (
    <div className="container-fluid mb-2">
      <NavBar onFilter={handleFilter} />
      <SearchBar />
      <CategoryFilter />
      <div className="content">
        <div className="divPagination">
          <Pagination
            pageSize={pageSize}
            totalProducts={allProducts.length}
            page={currentPage}
            pagination={handlePagination}
          />
        </div>
        <div className="container product-container">
          {currentProducts?.map((e) => {
            return (
              <Button
                key={e.idProduct}
                onClick={() => handleBuyClick(e.idProduct, e)}
              >
                <ProductCard
                  idproduct={e.idProduct}
                  productImg={e.productImg}
                  productName={e.productName}
                  productPrice={e.productPrice}
                />
              </Button>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};
