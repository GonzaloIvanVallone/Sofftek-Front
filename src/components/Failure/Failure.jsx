import React from "react";
import { useNavigate } from "react-router-dom";
import "../success/success";

export const Failure = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    localStorage.removeItem("formData");
    localStorage.removeItem("grouped");
    navigate("/");
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="card text-start">
          <div className="card-header">
            <h1>Vuelva prontos</h1>
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
