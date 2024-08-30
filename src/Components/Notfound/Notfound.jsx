import React from "react";
import style from "./Notfound.module.css";
import ErrorPage from "../../assets/error.svg";
import { Link } from "react-router-dom";
export default function Notfound() {
  document.title = "Page Notfound";
  return (
    <>
      <div className="page-wrap d-flex flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <img
                className="img-fluid"
                width="400px"
                src={ErrorPage}
                alt="Error-Page"
              />
              <div className="mb-4 lead">
                The page you are looking for was not found.
              </div>
              <Link to="">
                <button className="btn bg-green-color">Back to Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
