import { uiActions } from "./ui-slice";
import {cartActions} from './cart-slice'
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-redux-115d8-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );
      if(!response.ok){
          throw new Error('Could not fetch cart data')
      }
      const data = response.json();

      return data
    };
    try{
        const cartData = await fetchData()
        dispatch(cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity
        }))

    } catch(error){
        dispatch(
            uiActions.showNotification({
              status: "error",
              title: "Error",
              message: "Sending Cart Data Failed",
            })
          );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending Cart Data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-redux-115d8-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending Cart Data Failed",
        })
      );
    }
  };
};
