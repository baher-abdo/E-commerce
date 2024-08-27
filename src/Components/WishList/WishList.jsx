import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { WishListContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function WishList() {
  document.title = "Wish List";
  const { GetLoggedUserWishlist, removeProductFromWishlist } =
    useContext(WishListContext);
  const [wishListItems, setWishListItems] = useState(null);
  const [curentId, setCurentId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(null);
  const [curentIdRemove, setCurentIdRemove] = useState(0);

  const { addProductToCart, setCartItems, cartItems } = useContext(CartContext);

  async function getWishlistItems() {
    const { data } = await GetLoggedUserWishlist();
    setWishListItems(data);
  }
  async function removeWishlistItems(id) {
    setLoadingRemove(true);
    setCurentIdRemove(id);
    await removeProductFromWishlist(id);
    getWishlistItems();
  }
  async function addToCart(id) {
    setLoading(true);
    setCurentId(id);

    const res = await addProductToCart(id);
    if (res.data.status == "success") {
      setLoading(false);
      setCartItems(cartItems + 1);
      removeWishlistItems(id);
      toast.custom(
        <div
          className="w-50 text-center position-absolute top-0 start-50 translate-middle-x mt-5 alert alert-success text-success"
          role="alert"
        >
          <i className="fa-solid fa-check me-2 m-0 fw-bold"></i>
          {res.data.message}
        </div>
      );
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getWishlistItems();
  }, []);

  return (
    <>
      {wishListItems == null ? (
        <div className="spinneer d-flex align-items-center justify-content-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="container bg-light-subtle my-5 p-5 rounded-3">
          {wishListItems.count == 0 ? (
            <h3 className="text-center green-color">your wishlist is empty</h3>
          ) : (
            <h3>My wish List</h3>
          )}
          {wishListItems?.data.map((item) => {
            return (
              <div
                key={item?._id}
                className="row align-items-center border-bottom  border-secondary-subtle my-3 px-3"
              >
                <div className="product-image col-12 col-md-2">
                  <img
                    className="img-fluid"
                    src={item.imageCover}
                    alt="product-image"
                  />
                </div>
                <div className="details d-flex justify-content-between col-12 mt-2 col-md-10">
                  <div className="item-details">
                    <h5>{item.title?.split(" ").splice(0, 2).join(" ")}</h5>
                    <h6 className="fw-normal">{item?.price} EGP</h6>
                    <span
                      onClick={() => {
                        removeWishlistItems(item?.id);
                      }}
                      className="btn-remove text-danger p-1 rounded-2"
                    >
                      {loadingRemove && item.id == curentIdRemove ? (
                        <span>
                          <i className="fa-solid fa-spinner fa-spin me-2"></i>
                        </span>
                      ) : (
                        <i className="fa-solid fa-trash-can me-2"></i>
                      )}
                      Remove
                    </span>
                  </div>
                  <div className="quantity">
                    <button
                      onClick={() => {
                        addToCart(item?.id);
                      }}
                      className="btn bg-green-color"
                    >
                      Add to Cart
                      {loading && item.id == curentId ? (
                        <i className="fa-solid fa-spinner fa-spin ms-3"></i>
                      ) : (
                        <i className="fa-solid fa-cart-arrow-down ms-3"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
