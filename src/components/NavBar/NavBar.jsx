import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Navbar.css';
import { filterByCategories, getAllCategories } from "../../redux/actions/indexActions";
import { useNavigate } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';

export const NavBar = () =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCategories = useSelector((state) => state.allCategories)
  

  const handleFilterType = (e) =>{
    e.preventDefault();
    dispatch(filterByCategories(e.target.value));
  }

  const handleLogin = () => navigate('/login')

  const handleRegister = () => navigate('/register')
  useEffect(()=>{
    dispatch(getAllCategories());  
  }, [dispatch])

  return (
    <nav className="navbar">
      <div className="nav-left">
        <ul className="nav-list">
          <li className="nav-item dropdown">
            Categories
            <select onChange={(e) => handleFilterType(e)}>
              {allCategories?.map((f, index) => (
                <option key={index} value={f.category}>
                  {f.category}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </div>
      <div className="nav-right">
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
      </div>
        <CartWidget/>
    </nav>
  );
}