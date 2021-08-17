import React, { useReducer} from "react";
import CartContext from "./cart-context";
const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount = state.totalAmount + action.item.price;
    const existingItemCartIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItemInCart = state.items[existingItemCartIndex];
    let updatedItems;
    if (existingItemInCart) {
      const updatedItem = {
        ...existingItemInCart,
        amount: existingItemInCart.amount + 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemCartIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingItemCartIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItemInCart = state.items[existingItemCartIndex];
    const updatedTotalAmount = state.totalAmount - existingItemInCart.price;
    let updatedItems;
    if (existingItemInCart.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItemInCart,
        amount: existingItemInCart.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemCartIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if(action.type==='CLEAR'){
    return defaultCartState
  }
  return defaultCartState;
};
const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR"})
  }
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
