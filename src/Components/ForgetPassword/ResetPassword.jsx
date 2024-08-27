import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";

export default function ResetPassword() {
  document.title = "Reset Password";
  let navigate = useNavigate();
  let [ApiError, setApiError] = useState("");
  let [loader, setloader] = useState(false);
  let { setUserLogin } = useContext(UserContext);

  function handleLogin(values) {
    setloader(true);
    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then((response) => {
        setloader(false);
        if (response.statusText == "OK") {
          localStorage.setItem("userToken", response.data.token);
          setUserLogin(response.data.token);
          toast.custom(
            <div
              className="position-absolute d-flex align-items-center top-0 start-50 translate-middle-x mt-5 alert alert-success text-success"
              role="alert"
            >
              <i className="fa-solid fa-check me-2 m-0 fw-bold"></i>
              <p className="m-0">your password has been changed</p>
            </div>
          );
          navigate("/");
        }
      })
      .catch((response) => {
        setloader(false);
        setApiError(response.response.data.message);
      });
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("email pattern is inavalid")
      .required("email is required"),
    newPassword: Yup.string()
      .matches(
        /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{3,}$/g,
        "please choose A strong password try A mix of letters numbers"
      )
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
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
        <h2>reset your account password</h2>
        {ApiError == "" ? null : (
          <div className="alert alert-danger p-2 text-center" role="alert">
            {ApiError}
          </div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <input
              placeholder="Email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              type="email"
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
            <input
              placeholder="New Password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              name="newPassword"
              type="password"
              className="form-control"
              id="newPassword"
            />
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.password}
            </div>
          ) : null}
          <div className="bm-3 d-flex justify-content-between">
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
                "reset password"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
