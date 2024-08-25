"use client";

import React, { useEffect, useState } from "react";
import shoppingData from "@/app/store/data";
import { StaticImageData } from "next/image";
import SingleProduct from "./SingleProduct";

const AllProducts = () => {
  interface product {
    id: number;
    name: string;
    fullName: string;
    image: StaticImageData;
    price: string;
    rating: number;
    numReviews: number;
    inStock: boolean;
    delivery: boolean;
    brand: string;
    color: string;
    connectivity: string;
    modelname: string;
    formfactor: string;
    description: string;
    // viewId: string;
  }

  const [allProducts, setAllProducts] = useState<product[]>([]);

  useEffect(() => {
    if (shoppingData?.length) {
      localStorage.setItem("products", JSON.stringify(shoppingData));
      setAllProducts(shoppingData);
    }
  }, []);

  return (
    <div className=" h-auto w-full flex justify-between items-start flex-row flex-wrap">
      {allProducts?.map((item: product) => (
        <SingleProduct item={item} key={item.id} />
      ))}
    </div>
  );
};

export default AllProducts;
