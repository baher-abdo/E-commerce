import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetAccount() {
  document.title = "Reset Account";
  let navigate = useNavigate();
  let [ApiError, setApiError] = useState("");
  let [loader, setloader] = useState(false);

  function handleForgetPassword(values) {
    setloader(true);
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .then((response) => {
        setloader(false);
        navigate("/resetpassword");
      })
      .catch((response) => {
        setloader(false);
        setApiError(response.response.data.message);
      });
  }

  let validationSchema = Yup.object().shape({
    resetCode: Yup.string().required("code is required"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
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
        <h2>reset your account password</h2>
        {ApiError == "" ? null : (
          <div className="alert alert-danger p-2 text-center" role="alert">
            {ApiError}
          </div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <input
              placeholder="Code"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.code}
              name="resetCode"
              type="text"
              className="form-control"
              id="code"
              aria-describedby="codeHelp"
            />
          </div>
          {formik.errors.code && formik.touched.code ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.code}
            </div>
          ) : null}
          <div className="bm-3 d-flex justify-content-between">
            <button
              type="submit"
              id="verify-code"
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
