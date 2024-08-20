"use client";

import React, { useEffect, useState } from "react";
import shoppingData from "@/app/store/data";
import Image, { StaticImageData } from "next/image";
import SingleProduct from "./SingleProduct";

const AllProducts = () => {
  interface product {
    id: number;
    name: string;
    image: StaticImageData;
    price: string;
    rating: number;
    numReviews: number;
    inStock: boolean;
    delivery: boolean;
    viewId: string;
  }

  const [allProducts, setAllProducts] = useState<product[]>([]);

  useEffect(() => {
    if (shoppingData?.length) {
      setAllProducts(shoppingData);
    }
  }, []);

  return (
    <div className=" h-auto w-full flex justify-around items-start flex-row flex-wrap">
      {allProducts?.map((item: product) => (
        <SingleProduct item={item} key={item.id} />
      ))}
    </div>
  );
};

export default AllProducts;
