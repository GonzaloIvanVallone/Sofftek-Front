import React from 'react';
import './CartWidget.css';
import { useNavigate } from 'react-router-dom';

const CartWidget = () =>{

    const navigate = useNavigate();

    function handleCart(){
        navigate('/cart')
    }
    
    return(
        <div>
            <button onClick={handleCart}>
                <img src="https://www.seekpng.com/png/detail/901-9012555_tienda-tallas-grandes-blue-shopping-cart-icon-amazon.png" className="cartImg" />
            </button>
            
        </div>
    );
}

export default CartWidget;