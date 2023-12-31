import React from "react";
import "./Pagination.scss";

export const Pagination = ({ pageSize, totalProducts, page, pagination }) => {
    const totalPages = Math.ceil(totalProducts / pageSize);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  
    return (
      <div className="pagination">
      {page > 1 && (
        <button onClick={() => pagination(page - 1)}>{'<'}</button>
      )}
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => pagination(pageNumber)} className={pageNumber === page ? 'active' : ''}>
          {pageNumber}
        </button>
      ))}
      {page < totalPages && (
        <button onClick={() => pagination(page + 1)}>{'>'}</button>
      )}
    </div>
    );
  };