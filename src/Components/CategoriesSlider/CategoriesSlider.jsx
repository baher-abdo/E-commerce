import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
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
      <div className="slider py-4">
        <Slider {...settings}>
          {categories.map((cate) => {
            return (
              <div key={cate._id}>
                <img
                  className="w-100 object-fit-cover my-2"
                  style={{ height: 230 + "px" }}
                  src={cate.image}
                  alt="image"
                />
                <h5>{cate.name}</h5>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}
