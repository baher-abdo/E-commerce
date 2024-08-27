import style from "./Brands.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Brands() {
  document.title = "Brands";
  const [brands, setBrands] = useState(null);
  async function getBrands() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((response) => {
        setBrands(response.data.data);
      })
      .catch((response) => response);
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <div className="container">
        <h2 className="green-color text-center mb-3">All Brands</h2>
        {brands == null ? (
          <div className="spinneer d-flex align-items-center justify-content-center">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="mx-auto row row-cols-1 row-cols-md-3 row-cols-lg-4  g-3">
            {brands?.map((item) => {
              return (
                <div key={item._id} className="col">
                  <div className="card">
                    <Link>
                      <div className="card-body px-3">
                        <div className="image">
                          <img
                            className="w-100 object-fit-cover my-2"
                            src={item.image}
                            alt=""
                          />
                        </div>
                        <div className="title text-center">
                          <h3 className="m-0 green-color">{item.name}</h3>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
