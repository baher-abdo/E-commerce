import React, { useEffect, useState } from "react";
import style from "./Categories.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Categories() {
  document.title = "Categories";
  const [categories, setCategories] = useState(null);
  async function getCategories() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((response) => response);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {categories == null ? (
        <div className="spinneer d-flex align-items-center justify-content-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="mx-auto row row-cols-1 row-cols-md-3 g-3">
          {categories?.map((item) => {
            return (
              <div key={item._id} className="col">
                <div className="card">
                  <Link>
                    <div className="card-body px-3">
                      <div className="image">
                        <img
                          className="w-100 object-fit-cover my-2"
                          style={{ height: 270 + "px" }}
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
    </>
  );
}
