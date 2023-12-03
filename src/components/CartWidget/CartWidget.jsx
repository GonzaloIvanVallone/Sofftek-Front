import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './CartWidget.scss';
import { useNavigate } from 'react-router-dom';

const CartWidget = ({itemCount}) => {

    const navigate = useNavigate();

    function handleCart() {
        navigate('/cart')
    }

    return (
            <Button className='button'
                onClick={handleCart}>
                <FontAwesomeIcon icon={faShoppingCart} />
                &nbsp;Cart{itemCount > 0 && <span className="badge bg-secondary">{itemCount}</span>}
            </Button>
    );
}

CartWidget.propTypes = {
    itemCount: PropTypes.number.isRequired, // Define la validación de tipo y que es requerido
  };

export default CartWidget;