import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const navigate = useNavigate();
    const goHome = () => {
        navigate('/');
      };
    return(
        <div>
            <button onClick={goHome}>Go Back</button>
            <div>
                
            </div>
          
            <h1>Hola soy el carrito</h1>
        </div>
    );
} ;