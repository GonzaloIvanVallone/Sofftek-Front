import React, { useState, useEffect } from "react";
import "./NavBar.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartWidget from "../CartWidget/CartWidget";
import logo from "../../assets/hardtv2.png";
import { logout } from "../../redux/actions/indexActions";

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  const handleLogout = () => dispatch(logout());

  useEffect(() => {}, [isLoggedIn]);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img
          src={logo}
          width="100"
          height="100"
          className="d-inline-block align-top"
          alt="Logo"
        />
      </div>
      <div className="nav-right d-flex ">
        <div className="">
          <CartWidget />
        </div>
        {isLoggedIn ? (
          <div className="">
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
            {/* Additional authenticated user actions */}
          </div>
        ) : (
          <div className="">
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
            <button className="btn" onClick={handleRegister}>
              Register
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
