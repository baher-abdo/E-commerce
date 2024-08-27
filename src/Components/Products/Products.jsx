import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";

export default function Products() {
  document.title = "Products";

  const { data, isError, error, isLoading } = useProducts();
  const { addProductToCart, setCartItems, cartItems, getLoggedUserCart } =
    useContext(CartContext);
  const {
    AddProductToWishlist,
    productsInWishList,
    removeProductFromWishlist,
    setProductsInWishList,
    GetLoggedUserWishlist,
  } = useContext(WishListContext);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [curentId, setCurentId] = useState(0);

  async function addToCart(id) {
    setLoading(true);
    setCurentId(id);

    let response = await addProductToCart(id);

    if (response.data.status == "success") {
      setCartItems(cartItems + 1);
      toast.custom(
        <div
          className="w-50 text-center position-absolute top-0 start-50 translate-middle-x mt-5 alert alert-success text-success"
          role="alert"
        >
          <i className="fa-solid fa-check me-2 m-0 fw-bold"></i>
          {response.data.message}
        </div>
      );
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    GetLoggedUserWishlist(), getLoggedUserCart();
  }, []);

  if (isError) {
    return <h3>{error}</h3>;
  }
  if (isLoading) {
    return (
      <div className="spinneer d-flex align-items-center justify-content-center">
        <div className="loader"></div>
      </div>
    );
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
  return (
    <div className="container">
      <div className="input-group my-5">
        <div className="input-group-text bg-dark shadow-sm">
          <i className="fa-solid fa-magnifying-glass text-light" />
        </div>
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="form-control shadow-sm"
          id="autoSizingInputGroup"
          autoComplete="off"
          placeholder="search..."
        />
      </div>
      <div className="mx-auto row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
        {data.data.data
          ?.filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.title.toLowerCase().includes(search);
          })
          .map((product) => {
            return (
              <div className="col" key={product.id}>
                <div className="card product border-0">
                  <div className="p-3 text-center">
                    <Link to={`/productdetails/${product.id}`}>
                      <img
                        src={product.imageCover}
                        className="card-img-top"
                        alt="item"
                      />
                      <h5 className="green-color fw-normal text-start">
                        {product.category.name}
                      </h5>
                      <h5 className="text-muted fw-normal text-start">
                        {product.title.split(" ").splice(0, 2).join(" ")}
                      </h5>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span>{product.price} EGP</span>
                        <span>
                          <i className="fa-solid fa-star text-warning"></i>{" "}
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </Link>
                    <div className="favorite text-end mb-5">
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
                    <button
                      onClick={() => addToCart(product.id)}
                      className="btn add-to-cart bg-green-color w-75"
                    >
                      Add to Cart
                      {loading && product.id == curentId ? (
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
    </div>
  );
}
