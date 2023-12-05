import React from 'react'
import { useNavigate } from 'react-router-dom';
import './ButtonGoHome.scss'


const ButttonGoHome = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
      };

  return (
    <div>
        <button className="btn btnGo" onClick={goHome}>Go Home</button> 
    </div>
  )
}

export default ButttonGoHome