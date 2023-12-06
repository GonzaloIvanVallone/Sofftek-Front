import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const NotLoggin = () => {
  const location = useLocation();

  const messege = location.state;
  console.log(messege);
  const navigate = useNavigate();
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  return (
    <div>
      {messege}
      <div className="">
        <button className="btn" onClick={handleLogin}>
          Login
        </button>
        <button className="btn" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};
