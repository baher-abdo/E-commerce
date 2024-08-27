import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let { cartItems } = useContext(CartContext);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="">
            <div className="brand d-flex justify-content-center align-items-center">
              <img className="mb-1" src={logo} width="40px" alt="fresh-cart" />
              <h1 className="fs-3 ms-1">fresh cart</h1>
            </div>
          </Link>
          <button
            className="navbar-toggler shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            {userLogin != null ? (
              <>
                <ul className="navbar-nav gap-3 mx-auto mb-2 mb-lg-0">
                  <li>
                    <NavLink className="text-muted" to="">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="text-muted" to="cart">
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="text-muted" to="wishList">
                      wish list
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="text-muted" to="products">
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="text-muted" to="categories">
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="text-muted" to="brands">
                      Brands
                    </NavLink>
                  </li>
                </ul>
              </>
            ) : null}
            <div className="d-flex ms-auto justify-content-center">
              {userLogin != null ? (
                <>
                  <ul className="d-flex flex-column mb-3 flex-lg-row gap-lg-3  mb-lg-0 p-0">
                    <li>
                      <div
                        className="card-counter position-relative"
                        style={{ width: 30 + "px" }}
                      >
                        <Link to="cart">
                          <span className="position-absolute top-0 start-100 p-6 translate-middle badge rounded bg-green-color">
                            {cartItems}
                          </span>
                          <i className="fa-solid fa-cart-shopping fs-3 text-muted"></i>
                        </Link>
                      </div>
                    </li>
                    <li>
                      <Link className="text-muted" onClick={logOut} to="login">
                        log out
                      </Link>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <ul className="d-flex flex-column mb-3 flex-md-row gap-4 mb-lg-0 p-0">
                    <li>
                      <Link className="text-muted" to="register">
                        register
                      </Link>
                    </li>
                    <li>
                      <Link className="text-muted" to="login">
                        log in
                      </Link>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
