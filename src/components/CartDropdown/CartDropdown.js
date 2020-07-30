import React from "react";
import { connect } from 'react-redux';
import CustomButton from "../CustomButton/CustomButton";
import { CartItem } from '../CartItem/CartItem';
import { selectCartItems } from '../../redux/Cart/cart.selectors';
import { toggleCartHidden } from '../../redux/Cart/cart.actions';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems, history, dispatch }) => {
  
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {
          cartItems.length ? (
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
          ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton onClick={()=> {
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }}>GO TO CHECKOUT</CustomButton>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));