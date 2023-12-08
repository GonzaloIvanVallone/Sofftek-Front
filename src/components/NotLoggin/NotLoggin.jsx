import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NotLoggin.scss"

export const NotLoggin = () => {
  const location = useLocation();

  const messege = location.state;
  console.log(messege);
  const navigate = useNavigate();
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  return (
    <div className="NotLogin">
      <div class="card text-center">
        <div class="card-header">
          {messege}
        </div>
        <div class="card-body">
          <button className="btn" onClick={handleLogin}>
            Login
          </button>
          <button className="btn" onClick={handleRegister}>
            Register
          </button>
        </div>
        <div class="card-footer text-muted">
          @HardTek
        </div>
      </div>
    </div>
  );
};
