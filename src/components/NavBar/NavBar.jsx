import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Navbar.css';
import { filterByCategories, getAllCategories } from "../../redux/actions/indexActions";
import { useNavigate } from 'react-router-dom';


export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCategories = useSelector((state) => state.allCategories)
  

  function handleFilterType(e){
    e.preventDefault();
    dispatch(filterByCategories(e.target.value));
  }

  function handleLogin(){
    navigate('/login')

  }

  function handleRegister(){
    navigate('/register')
  }
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
    </nav>
  );
}