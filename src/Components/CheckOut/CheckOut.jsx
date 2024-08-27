import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext";

export default function CheckOut() {
  document.title = "CheckOut";

  let [loader, setloader] = useState(false);
  let { checkOut, cartId } = useContext(CartContext);

  let validationSchema = Yup.object().shape({
    details: Yup.string()
      .min(3, "details min length is 3")
      .required("details is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid Phone")
      .required("phone is required"),
    city: Yup.string().required("city is required"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => handleCheckOut(cartId, "https://e-commerce-baher.vercel.app/"),
  });

  async function handleCheckOut(cartId, url) {
    setloader(true);
    let { data } = await checkOut(cartId, url, formik.values);
    window.location.href = data.session.url;
  }

  return (
    <>
      <div className="container">
        {loader ? (
          <div className="spinneer d-flex align-items-center justify-content-center">
            <div className="loader"></div>
          </div>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputDetails" className="form-label">
              Details :
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.details}
              name="details"
              type="text"
              className="form-control"
              id="details"
              aria-describedby="detailsHelp"
            />
          </div>
          {formik.errors.details && formik.touched.details ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.details}
            </div>
          ) : null}
          <div className="mb-3">
            <label htmlFor="exampleInputDetails" className="form-label">
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
              aria-describedby="phoneHelp"
            />
          </div>
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.phone}
            </div>
          ) : null}
          <div className="mb-3">
            <label htmlFor="exampleInputDetails" className="form-label">
              City :
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.city}
              name="city"
              type="text"
              className="form-control"
              id="city"
              aria-describedby="cityHelp"
            />
          </div>
          {formik.errors.city && formik.touched.city ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.city}
            </div>
          ) : null}
          <div>
            <button
              type="submit"
              id="login"
              className={`btn fs-5 py-2 w-100  ${
                formik.isValid && formik.dirty ? "bg-green-color" : "disabled"
              }`}
            >
              {loader ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Pay now"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
