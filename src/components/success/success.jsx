import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { billSave, removeAllCart } from "../../redux/actions/indexActions";
import { useNavigate } from "react-router-dom";
import "./success.scss";

export const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = JSON.parse(localStorage.getItem("formData"));

  const handleGoHome = () => {
    dispatch(billSave(formData));

    if (formData.comeFrom == "cart") {
      dispatch(removeAllCart());
      localStorage.removeItem("cart");
    }
    localStorage.removeItem("formData");
    localStorage.removeItem("grouped");
    navigate("/");
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="card text-start">
          <div className="card-header">
            <h1>Thanks for trust us!</h1>
          </div>
          <div className="card-body">
            <p>Province: {formData.province}</p>
            <p>Locality: {formData.locality}</p>
            <p>Street: {formData.street}</p>
            <p>Street Number: {formData.streetNumber}</p>
            <p>Total Amount: {formData.amount}</p>
            <p>Product:</p>
            <ul>
              {formData.lstItem.map((item, index) => (
                <li key={index}>
                  Name: {item.product.productName} , Quantity selected:{" "}
                  {item.quantitySelected}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary" onClick={handleGoHome}>
              Go back Hardtekk!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
