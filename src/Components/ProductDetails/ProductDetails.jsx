import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { WishListContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [product, setproduct] = useState(null);
  let { addProductToCart, setCartItems, cartItems, getLoggedUserCart } =
    useContext(CartContext);
  let {
    AddProductToWishlist,
    productsInWishList,
    removeProductFromWishlist,
    setProductsInWishList,
    GetLoggedUserWishlist,
  } = useContext(WishListContext);
  const [loading, setLoading] = useState(false);
  const [curentId, setCurentId] = useState(0);

  let { id } = useParams();
  var Settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
  };

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((response) => {
        setproduct(response.data.data);
      })
      .catch((response) => {
      });
  }
  async function AddToWishList(id) {
    let response = await AddProductToWishlist(id);
    if (response.data.status == "success") {
      setProductsInWishList(response.data.data);
      toast.custom(
        <div
          className="w-50 text-center position-absolute top-0 start-50 translate-middle-x mt-5 alert alert-success text-success"
          role="alert"
        >
          <i className="fa-solid fa-check me-2 m-0 fw-bold"></i>
          {response.data.message}
        </div>
      );
    }
  }
  async function removeFromWishList(id) {
    let response = await removeProductFromWishlist(id);
    setProductsInWishList(response.data.data);
  }
  async function addToCart(id) {
    setLoading(true);
    setCurentId(id);

    let res = await addProductToCart(id);
    if (res.data.status == "success") {
      setCartItems(cartItems + 1);
      toast.custom(
        <div
          className="w-50 text-center position-absolute top-0 start-50 translate-middle-x mt-5 alert alert-success text-success"
          role="alert"
        >
          <i className="fa-solid fa-check me-2 m-0 fw-bold"></i>
          {res.data.message}
        </div>
      );
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    getLoggedUserCart();
    GetLoggedUserWishlist();
    getProduct(id);
  }, []);

  return (
    <>
      {product == null ? (
        <div className="spinneer d-flex align-items-center justify-content-center">
          <div className="loader"></div>{" "}
        </div>
      ) : (
        <div className="product row align-content-center">
          <div className="img col-md-4">
            <Slider {...Settings}>
              {product.images.map((img, i) => {
                return (
                  <img
                    key={i}
                    className="w-100"
                    src={img}
                    alt="product-image"
                  />
                );
              })}
            </Slider>
          </div>
          <div className="details col-md-8 align-content-center">
            <div>
              <h2 className="text-dark">{product?.title}</h2>
              <h6 className="text-dark">{product?.description}</h6>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span>{product?.price} EGP</span>
                <span>
                  <i className="fa-solid fa-star text-warning"></i>{" "}
                  {product?.ratingsAverage}
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-4">
                <button
                  onClick={() => {
                    addToCart(product.id);
                  }}
                  className="btn bg-green-color mx-auto w-75"
                >
                  Add to Cart{" "}
                  {loading && product.id == curentId ? (
                    <i className="fa-solid fa-spinner fa-spin ms-3"></i>
                  ) : (
                    <i className="fa-solid fa-cart-arrow-down ms-3"></i>
                  )}
                </button>
                <div className="favorite">
                  {productsInWishList?.includes(product.id) ? (
                    <i
                      onClick={() => removeFromWishList(product.id)}
                      className="fa-solid fa-heart fs-3 wishlist-red-heart wishlist-heart"
                    ></i>
                  ) : (
                    <i
                      onClick={() => AddToWishList(product.id)}
                      className="fa-solid fa-heart wishlist-heart fs-3"
                    ></i>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
