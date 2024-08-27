import React from "react";
import Slider from "react-slick";

import slider1 from "../../assets/ptoduct-1-min.png";
import slider2 from "../../assets/ptoduct-2-min.png";
import slider3 from "../../assets/ptoduct-3-min.png";

import slider5 from "../../assets/ptoduct-5-min.png";
import slider6 from "../../assets/ptoduct-6-min.png";
import slider7 from "../../assets/ptoduct-7-min.png";
import slider8 from "../../assets/ptoduct-8-min.png";
import slider9 from "../../assets/ptoduct-9-min.jpg";
import slider10 from "../../assets/ptoduct-10-min.jpg";

export default function MainSlider() {
  var H = {};
  var V = {
    arrows: false,
    infinite: true,
    autoplay: true,
    pauseOnHover: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    vertical: true,
    rtl: true,
    Default: false,
  };
  return (
    <div className="container row justify-content-center">
      <div className="col-md-10 p-0">
        <Slider {...H}>
          <img
            className="img-fluid object-fit-cover"
            src={slider3}
            alt="image"
          />
          <img
            className="img-fluid object-fit-cover"
            src={slider1}
            alt="image"
          />
          <img
            className="img-fluid object-fit-cover"
            src={slider2}
            alt="image"
          />
        </Slider>
      </div>
      <div className="col-md-2 p-0 pe-3">
        <Slider {...V}>
          <img className="img-fluid" src={slider5} alt="image" />
          <img className="img-fluid" src={slider6} alt="image" />
          <img className="img-fluid" src={slider7} alt="image" />
          <img className="img-fluid" src={slider8} alt="image" />
          <img className="img-fluid" src={slider9} alt="image" />
          <img className="img-fluid" src={slider10} alt="image" />
        </Slider>
      </div>
    </div>
  );
}
