import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Products/Products";
import Notfound from "./Components/Notfound/Notfound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import CheckOut from "./Components/CheckOut/CheckOut";
import WishList from "./Components/WishList/WishList";
import WishListProvider from "./Context/WishListContext";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetAccount from "./Components/ForgetPassword/ResetAccount";
import ResetPassword from "./Components/ForgetPassword/ResetPassword";
import { useEffect, useState } from "react";

let query = new QueryClient();

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishList",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "resetaccount", element: <ResetAccount /> },
      { path: "resetpassword", element: <ResetPassword /> },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  const [checkStatus, setcheckStatus] = useState(true);

  return (
    <>
      <UserContextProvider>
        <WishListProvider>
          <QueryClientProvider client={query}>
            <CartContextProvider>
              <RouterProvider router={x}></RouterProvider>
              <Toaster />
            </CartContextProvider>
          </QueryClientProvider>
        </WishListProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
