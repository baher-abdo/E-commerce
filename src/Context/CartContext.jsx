import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartId, setCartId] = useState(0);
  const [cartItems, setCartItems] = useState(null);
  const [curentItems, setCurentItems] = useState(0);
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function addProductToCart(productId) {
    let headers = {
      token: localStorage.getItem("userToken"),
    };
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        { headers }
      )
      .then((response) => response)
      .catch((response) => response);
  }
  function getLoggedUserCart() {
    let headers = {
      token: localStorage.getItem("userToken"),
    };
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => {
        setCartId(response.data.data._id);
        setCartItems(response.data.numOfCartItems);
        return response;
      })
      .catch((response) => response);
  }

  function updateCartProductQuantity(productId, newCount) {
    let headers = {
      token: localStorage.getItem("userToken"),
    };
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers }
      )
      .then((response) => response)
      .catch((response) => response);
  }

  function removeProductFromCart(productId) {
    let headers = {
      token: localStorage.getItem("userToken"),
    };
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((response) => response);
  }
  function clearAllProducts() {
    let headers = {
      token: localStorage.getItem("userToken"),
    };
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
        headers,
      })
      .then((response) => response)
      .catch((response) => response);
  }

  function checkOut(cartId, url, formData) {
    let headers = {
      token: localStorage.getItem("userToken"),
    };
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: formData },
        { headers }
      )
      .then((response) => response)
      .catch((response) => response);
  }

  useEffect(() => {
    if (cartItems == null) {
      setCartItems(0);
    } else {
      setCartItems(cartItems);
    }
  }, []);
  return (
    <>
      <CartContext.Provider
        value={{
          addProductToCart,
          getLoggedUserCart,
          updateCartProductQuantity,
          removeProductFromCart,
          clearAllProducts,
          checkOut,
          cartId,
          cartItems,
          setCartItems,
        }}
      >
        {props.children}
      </CartContext.Provider>
    </>
  );
}
