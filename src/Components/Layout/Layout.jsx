import React, { useState } from "react";
import style from "./Layout.module.css";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import AuthModal from "../AuthModal/AuthModal";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container my-5 py-5">
        <Outlet />
      </div>
      <AuthModal />
    </>
  );
}
