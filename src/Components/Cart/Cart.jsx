import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  document.title = "Cart";

  const {
    getLoggedUserCart,
    updateCartProductQuantity,
    removeProductFromCart,
    clearAllProducts,
    cartItems,
    setCartItems,
  } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(null);
  const [loadingRemove, setLoadingRemove] = useState(null);
  const [curentId, setCurentId] = useState(0);
  const [curentIdRemove, setCurentIdRemove] = useState(0);

  async function getCartItems() {
    const response = await getLoggedUserCart();
    if (response.data.status == "success") {
      setCartDetails(response.data);
    }
  }

  async function removeProduct(productId) {
    setLoadingRemove(true);
    setCurentIdRemove(productId);
    const response = await removeProductFromCart(productId);
    setCartDetails(response.data);
    setCartItems(cartItems - 1);
  }
  async function updatProduct(id, count) {
    setCurentId(id);
    setLoading(true);
    if (count == 0) {
      removeProduct(id);
    } else {
      const response = await updateCartProductQuantity(id, count);
      setCartDetails(response.data);
      setLoading(false);
    }
  }

  async function clearCart() {
    setCartDetails(null);
    await clearAllProducts();
    getCartItems();
  }
  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      {cartDetails == null ? (
        <div className="spinneer d-flex align-items-center justify-content-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="container bg-light-subtle my-5 p-5 rounded-3">
          {cartDetails.numOfCartItems == 0 ? (
            <h3 className="text-center green-color">your cart is empty</h3>
          ) : (
            <>
              {" "}
              <div className="d-flex justify-content-between mb-4">
                <h3>Cart Shop</h3>
                <Link to={"/checkout"} className="btn bg-green-color">
                  check out
                </Link>
              </div>
              <div className="d-flex flex-wrap justify-content-between">
                <h5>
                  total price:{" "}
                  <span className="green-color">
                    {cartDetails.data.totalCartPrice}
                  </span>
                </h5>
                <h5>
                  total number of items:{" "}
                  <span className="green-color">
                    {cartDetails.numOfCartItems}
                  </span>
                </h5>
              </div>{" "}
            </>
          )}
          {cartDetails?.data.products.map((item) => {
            return (
              <div
                key={item._id}
                className="row align-items-center border-bottom  border-secondary-subtle my-3 px-3"
              >
                <div className="product-image col-12 col-md-2">
                  <img
                    className="img-fluid"
                    src={item.product.imageCover}
                    alt="product-image"
                  />
                </div>
                <div className="details d-flex justify-content-between col-12 mt-2 col-md-10">
                  <div className="item-details">
                    <h5>
                      {item.product.title.split(" ").splice(0, 2).join(" ")}
                    </h5>
                    <h6 className="fw-normal">{item.price} EGP</h6>
                    <span
                      onClick={() => {
                        removeProduct(item.product.id);
                      }}
                      className="btn-remove text-danger p-1 rounded-2"
                    >
                      {loadingRemove && item.product.id == curentIdRemove ? (
                        <span>
                          <i className="fa-solid fa-spinner fa-spin me-2"></i>
                        </span>
                      ) : (
                        <i className="fa-solid fa-trash-can me-2"></i>
                      )}
                      Remove
                      {/* <i className="fa-solid fa-trash-can"></i> Remove */}
                    </span>
                  </div>
                  <div className="quantity d-flex align-items-baseline">
                    <button
                      onClick={() => {
                        updatProduct(item.product.id, item.count - 1);
                      }}
                      className="btn btn-outline-success"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <div className="text-center" style={{ width: 50 + "px" }}>
                      {loading && item.product.id == curentId ? (
                        <span>
                          <i className="fa-solid fa-spinner fa-spin"></i>
                        </span>
                      ) : (
                        <h5 className="fw-normal">{item.count}</h5>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        updatProduct(item.product.id, item.count + 1);
                      }}
                      className="btn btn-outline-success "
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="remove text-center pt-2">
            <div
              onClick={() => {
                clearCart();
              }}
              className={`btn bg-green-color ${
                cartDetails == null || cartDetails.numOfCartItems == 0
                  ? "d-none"
                  : null
              }`}
            >
              Clear Cart
            </div>
          </div>
        </div>
      )}
    </>
  );
}
