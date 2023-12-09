import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bibSave } from "../../redux/actions/indexActions";
import { useNavigate } from "react-router-dom";
import './success.scss';

export const Success = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const formData = JSON.parse(localStorage.getItem("formData"));
  console.log(formData)

  const handleGoHome = () => {
    dispatch(bibSave(JSON.parse(localStorage.getItem("formData"))));
    // if(localStorage.getItem("formData").)
    localStorage.removeItem("formData");
    localStorage.removeItem("grouped");
    navigate("/");u
  };

  return (
    <div>
      <div class="container mt-5">
        <div class="card text-start">
          <div class="card-header">
            <h1>Thanks for trust us!</h1>
          </div>
          <div class="card-body">
              <p>Province: {formData && formData.province}</p>
              <p>Locality: {formData && formData.locality}</p>
              <p>Street: {formData && formData.street}</p>
              <p>Street Number: {formData && formData.streetNumber}</p>
              <p>Total Amount: {formData && formData.amount}</p>
              <p>Product:</p>
              <ul>
                {formData.lstItem.map((item, index) => (
                  <li key={index}>
                    Name: {item.product.productName} , Quantity selected: {item.quantitySelected}
                  </li>
                ))}
              </ul>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary" onClick={handleGoHome}>Go back Hardtekk!</button>
          </div>
        </div>
      </div>
    </div>
  );
};
