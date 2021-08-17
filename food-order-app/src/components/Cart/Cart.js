import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit,setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true)
    await fetch('https://react-http-365ae-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      })
    })
    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clearCart()
  }

  const modalActions =      <div className={classes.actions}>
  <button
    type="button"
    className={classes["button--alt"]}
    onClick={props.onClose}
  >
    Close
  </button>
  {hasItems && (
    <button className={classes.button} onClick={orderHandler}>
      Order
    </button>
  )}
</div>
  
  const cartModalContent = <React.Fragment>
          {!isCheckout && cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
      {!isCheckout && modalActions}
  </React.Fragment>

  const submitModalContent = <React.Fragment>
    <p>Your Order was Successful</p>
    <button
    type="button"
    className={classes["button--alt"]}
    onClick={props.onClose}
  >
    Close
  </button>
  </React.Fragment>

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && !didSubmit && <p>Is Submitting your Order</p>}
      {!isSubmitting && didSubmit && submitModalContent}
    </Modal>
  );
};

export default Cart;
