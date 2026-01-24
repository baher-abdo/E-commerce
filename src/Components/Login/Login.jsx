import style from "./Login.module.css";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import { AuthModalContext } from "../../Context/AuthModalContext";
import { useQueryClient } from "@tanstack/react-query";

export default function Login({ isModal, onForgetPassword }) {
  if (!isModal) document.title = "Login";
  let navigate = useNavigate();
  let [ApiError, setApiError] = useState("");
  let [loader, setloader] = useState(false);
  let { setUserLogin } = useContext(UserContext);
  const { closeModal, onLoginSuccess } = useContext(AuthModalContext);
  const queryClient = useQueryClient();

  function handleLogin(values) {
    setloader(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((response) => {
        setloader(false);
        if (response.data.message == "success") {
          localStorage.setItem("userToken", response.data.token);
          setUserLogin(response.data.token);
          
          // Invalidate queries to refresh cart/wishlist
          queryClient.invalidateQueries();
          
          if (isModal) {
            // Execute callback first if exists
            if (typeof onLoginSuccess === 'function') {
               onLoginSuccess();
            }
            // Close modal after a brief delay to ensure state updates
            setTimeout(() => {
              closeModal();
            }, 100);
          } else {
            navigate("/");
          }
        }
      })
      .catch((response) => {
        setloader(false);
        setApiError(response.response?.data?.message || "An error occurred");
      });
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("email pattern is inavalid")
      .required("email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{3,}$/g,
        "please choose A strong password try A mix of letters numbers"
      )
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "guest14@gmail.com",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });
  return (
    <>
      <div className="container">
        {loader ? (
          <div className="spinneer d-flex align-items-center justify-content-center">
            <div className="loader"></div>
          </div>
        ) : null}
        <h2 className={isModal ? "d-none" : ""}>login now</h2>
        {ApiError == "" ? null : (
          <div className="alert alert-danger p-2 text-center" role="alert">
            {ApiError}
          </div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email :
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="form-control"
              id="email1"
              aria-describedby="emailHelp"
            />
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.email}
            </div>
          ) : null}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password :
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              type="password"
              placeholder="Password is guest@123"
              className="form-control"
              id="password1"
            />
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.password}
            </div>
          ) : null}
          <div className="bm-3 d-flex justify-content-between">
            {isModal ? (
              <button
                type="button"
                onClick={onForgetPassword}
                className="btn btn-link p-0 fw-medium fs-6 text-muted bg-transparent text-decoration-underline"
              >
                forget your password ?
              </button>
            ) : (
              <Link
                to="/forget-password"
                id="forget-pass"
                className="fw-medium fs-5"
              >
                forget your password ?
              </Link>
            )}
            <button
              type="submit"
              id="login"
              className={`btn fs-5 py-2 px-3  ${
                formik.isValid && formik.dirty ? "bg-green-color" : "disabled"
              }`}
            >
              {loader ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "login now"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
