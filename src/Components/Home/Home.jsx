import React, { useState } from "react";
import style from "./Home.module.css";
import RecentProdcuts from "../RecentProducts/RecentProdcuts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";

export default function Home() {
  document.title = "Home";
  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <RecentProdcuts />
    </>
  );
}
