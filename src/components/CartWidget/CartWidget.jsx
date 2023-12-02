import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './CartWidget.scss';
import { useNavigate } from 'react-router-dom';

const CartWidget = () => {

    const navigate = useNavigate();

    function handleCart() {
        navigate('/cart')
    }

    return (
        <div>
            <Button className='button'
                onClick={handleCart}>
                <FontAwesomeIcon icon={faShoppingCart} />
                &nbsp;Carrito
            </Button>

        </div>
    );
}

export default CartWidget;