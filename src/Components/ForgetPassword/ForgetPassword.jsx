import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function ForgetPassword() {
  document.title = "Forget Passwrod";
  let navigate = useNavigate();
  let [ApiError, setApiError] = useState("");
  let [loader, setloader] = useState(false);

  function handleForgetPassword(values) {
    setloader(true);
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .then((response) => {
        setloader(false);
        if (response.data.statusMsg == "success") {
          navigate("/resetaccount");
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
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleForgetPassword,
  });
  return (
    <>
      <div className="container">
        {loader ? (
          <div className="spinneer d-flex align-items-center justify-content-center">
            <div className="loader"></div>
          </div>
        ) : null}
        <h2>please enter your Email code</h2>
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
          <div className="bm-3 d-flex justify-content-between">
            <button
              type="submit"
              id="verify-email"
              className={`btn fs-5 py-2 px-3  ${
                formik.isValid && formik.dirty ? "bg-green-color" : "disabled"
              }`}
            >
              {loader ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "verify"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
