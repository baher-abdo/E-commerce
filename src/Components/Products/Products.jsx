import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";
import { AuthModalContext } from "../../Context/AuthModalContext";

export default function Products() {
  document.title = "Products";

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const { data, isError, error, isLoading } = useProducts(page, limit);
  const { userLogin } = useContext(UserContext);
  const { openModal } = useContext(AuthModalContext);

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
    if (!userLogin) {
      openModal(() => addToCart(id));
      return;
    }
    setLoading(true);
    setCurentId(id);

    let response = await addProductToCart(id);

    if (response.data.status == "success") {
      setCartItems(response.data.numOfCartItems);
      toast.success(response.data.message, {
        style: { backgroundColor: "#4b974be0", color: "#ffff" },
        duration: 3000,
      });
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userLogin) {
      GetLoggedUserWishlist();
      getLoggedUserCart();
    }
  }, [userLogin]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

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
    if (!userLogin) {
      openModal(() => AddToWishList(id));
      return;
    }
    let response = await AddProductToWishlist(id);
    if (response.data.status == "success") {
      setProductsInWishList(response.data.data);
      toast.success(response.data.message, {
        style: { backgroundColor: "#4b974be0", color: "#ffff" },
        duration: 3000,
      });
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
            setPage(1);
          }}
          className="form-control shadow-sm"
          id="autoSizingInputGroup"
          autoComplete="off"
          placeholder="search..."
        />
        <select
          className="form-select shadow-sm flex-grow-0 w-auto ms-2 cursor-pointer"
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={12}>12 per page</option>
          <option value={24}>24 per page</option>
          <option value={36}>36 per page</option>
          <option value={48}>48 per page</option>
          <option value={60}>60 per page</option>
        </select>
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
      <nav aria-label="Page navigation example" className="my-5">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link cursor-pointer"
              onClick={() => setPage(page - 1)}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {[...Array(data?.data?.metadata?.numberOfPages || 1)].map((_, i) => (
            <li
              key={i + 1}
              className={`page-item ${page === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link cursor-pointer"
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              page === data?.data?.metadata?.numberOfPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link cursor-pointer"
              onClick={() => setPage(page + 1)}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
