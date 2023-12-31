import React from "react";
import "./NavBar.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CartWidget } from "../CartWidget/CartWidget";
import logo from "../../assets/hardtv2.png";
import logoadmin from "../../assets/klipartz.com.png";
import { getAllProducts, logout } from "../../redux/actions/indexActions";

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isAdmin = useSelector((state) => state.isAdmin);

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  const handleLogout = () => dispatch(logout());

  const goHome = () => {
    navigate("/");
    window.location.reload();
  };

  const goAdmin = () => {
    navigate("/dashboard/homedash");
  };

  return (
    <nav className="navbar">
      <div className="nav-left d-flex">
        <button className="btnLogo" onClick={goHome}>
          <img
            src={logo}
            width="100"
            height="100"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </button>
        {isAdmin && isLoggedIn && (
          <button className="btnLogo" onClick={goAdmin}>
            <img
              src={logoadmin}
              width="70"
              height="70"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </button>
        )}
      </div>
      <div className="nav-right d-flex ">
        {isLoggedIn ? (
          <div className="">
            <CartWidget />
          </div>
        ) : null}
        {isLoggedIn ? (
          <div className="">
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
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
