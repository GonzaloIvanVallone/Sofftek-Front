import React, { useState, useEffect } from 'react';
import './NavBar.scss';
import { useNavigate } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import logo from '../../assets/hardtv2.png';
import { logout } from "../../redux/actions/indexActions";
import { useDispatch } from "react-redux";

export const NavBar = () => {
  
  const navigate = useNavigate();


  const handleLogin = () => navigate('/login')

  const handleRegister = () => navigate('/register')
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logout())
  // Check if localStorage.token exists
  // const isLoggedIn = localStorage.getItem('token') !== null;
  useEffect(() => {     setIsLoggedIn(!!localStorage.getItem('token'));   }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  
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
        <div className=''>
          <CartWidget />
        </div>
        {isLoggedIn?(
        <div className=''>
        <button className='btn' onClick={handleLogout}>Logout</button>
        <button className='btn'>{}</button>
      </div>
        ):(
          <div className=''>
          <button className='btn' onClick={handleLogin}>Login</button>
          <button className='btn' onClick={handleRegister}>Register</button>
        </div>
        )}
      </div>
    </nav>
  );
}