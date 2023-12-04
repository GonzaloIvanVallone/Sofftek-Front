import React from 'react';
import './NavBar.scss';
import { useNavigate } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import logo from '../../assets/hardtv2.png';

export const NavBar = () => {
  
  const navigate = useNavigate();
  

  const handleLogin = () => navigate('/login')

  const handleRegister = () => navigate('/register')
  

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
        <div className=''>
          <button className='btn' onClick={handleLogin}>Login</button>
          <button className='btn' onClick={handleRegister}>Register</button>
        </div>
      </div>
    </nav>
  );
}