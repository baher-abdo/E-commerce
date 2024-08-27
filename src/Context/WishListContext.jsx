import axios from "axios";
import { createContext, useState } from "react";

export let WishListContext = createContext();

export default function WishListProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  const [productsInWishList, setProductsInWishList] = useState(null);

  function AddProductToWishlist(productId) {
    let headers = {
      token: localStorage.getItem("userToken"),
    };
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist/`,
        { productId: productId },
        { headers }
      )
      .then((response) => response)
      .catch((response) => response);
  }
  function GetLoggedUserWishlist() {
    let headers = {
      token: localStorage.getItem("userToken"),
    };
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist/`, { headers })
      .then((response) => {
        if (response.data.status == "success") {
          setProductsInWishList(
            response.data.data.map((e) => {
              return e.id;
            })
          );
        }

        return response;
      })
      .catch((response) => response);
  }
  function removeProductFromWishlist(productId) {
    let headers = {
      token: localStorage.getItem("userToken"),
    };
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((response) => response);
  }
  return (
    <>
      <WishListContext.Provider
        value={{
          AddProductToWishlist,
          GetLoggedUserWishlist,
          removeProductFromWishlist,
          productsInWishList,
          setProductsInWishList,
        }}
      >
        {props.children}
      </WishListContext.Provider>
    </>
  );
}
