import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProducts() {
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products/");
  }

  let productsInfo = useQuery({
    queryKey: ["recentProduct"],
    queryFn: getProducts,
    staleTime: 1000,
  });

  return productsInfo;
}
