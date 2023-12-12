import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../ProductCard/ProductCard";
import { SearchBar } from "../SearchBar/SearchBar";
import { Pagination } from "../Pagination/Pagination";
import "./Home.scss";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import { NavBar } from "../NavBar/NavBar";
import { Footer } from "../Footer/Footer";
import { getAllProducts } from "../../redux/actions/indexActions";

export const Home = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const handleBuyClick = (id, product) => {
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
      <NavBar />
      <SearchBar />
      <CategoryFilter onFilter={handleFilter} />
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
          {currentProducts?.length > 0 ? (
            currentProducts.map((e) => (
              <Button
                key={e.idProduct}
                onClick={() => handleBuyClick(e.idProduct, e)}
              >
                <ProductCard
                  idproduct={e.idProduct}
                  productImg={e.productImg}
                  productName={e.productName}
                  description={e.description.slice(0, 80)}
                  productPrice={e.productPrice}
                />
              </Button>
            ))
          ) : (
            <p>Ups! there are no products to show</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
