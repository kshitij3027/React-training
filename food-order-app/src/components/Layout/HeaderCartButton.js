import React from "react";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const {items} = cartCtx
  useEffect(() => {
    if(items.length === 0){
      return
    }
      setBtnIsHighlighted(true)
      const timer = setTimeout(() => {
        setBtnIsHighlighted(false)
      },300)
      return ()=>{
        clearTimeout(timer)
      }
  }, [items]);
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`
  const numberOfCartItems = cartCtx.items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);
  return (
    <div className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </div>
  );
};

export default HeaderCartButton;
