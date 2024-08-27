import React, { useContext, useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  document.title = "Register";
  let navigate = useNavigate();
  let [ApiError, setApiError] = useState("");
  let [loader, setloader] = useState(false);
  let { setUserLogin } = useContext(UserContext);

  function handleRegister(values) {
    setloader(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((response) => {
        setloader(false);
        if (response.data.message == "success") {
          localStorage.setItem("userToken", response.data.token);
          setUserLogin(response.data.token);
          navigate("/login");
        }
      })
      .catch((response) => {
        setloader(false);
        setApiError(response.response.data.message);
      });
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "name min length is 3")
      .required("name is required"),
    email: Yup.string()
      .email("email pattern is inavalid")
      .required("email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid Phone")
      .required("phone is required"),
    password: Yup.string()
      .matches(
        /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{3,}$/g,
        "Please Choose A Strong Password Try A Mix Of Letters Numbers"
      )
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and Re-assword does not match")
      .required("Re-password is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });
  return (
    <>
      <div className="container">
        {loader ? (
          <div className="spinneer d-flex align-items-center justify-content-center">
            <div className="loader"></div>{" "}
          </div>
        ) : null}
        <h2>register now</h2>
        {ApiError == "" ? null : (
          <div className="alert alert-danger p-2 text-center" role="alert">
            {ApiError}
          </div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name :
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              type="text"
              className="form-control"
              id="name"
              aria-describedby="nameHelp"
            />
          </div>
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.name}
            </div>
          ) : null}
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
              className="form-control"
              id="password1"
            />
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.password}
            </div>
          ) : null}
          <div className="mb-3">
            <label htmlFor="exampleInputRepassword1" className="form-label">
              Re-password :
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              name="rePassword"
              type="password"
              className="form-control"
              id="rePassword"
            />
          </div>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.rePassword}
            </div>
          ) : null}
          <div className="mb-3">
            <label htmlFor="exampleInputPhone" className="form-label">
              Phone :
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              name="phone"
              type="tel"
              className="form-control"
              id="phone"
            />
          </div>
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.phone}
            </div>
          ) : null}
          <div className="text-end">
            <button
              type="submit"
              id="register"
              className={`btn fs-5 py-2 px-3  ${
                formik.isValid && formik.dirty ? "bg-green-color" : "disabled"
              }`}
            >
              {loader ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Register now"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
