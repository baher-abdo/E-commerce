import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProducts(page = 1, limit = 12) {
  function getProducts() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${limit}`
    );
  }

  let productsInfo = useQuery({
    queryKey: ["recentProduct", page, limit],
    queryFn: getProducts,
    staleTime: 1000,
  });

  return productsInfo;
}
