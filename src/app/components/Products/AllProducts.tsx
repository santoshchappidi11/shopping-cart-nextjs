"use client";

import React, { useEffect, useState } from "react";
import shoppingData from "@/app/store/data";
import { StaticImageData } from "next/image";
import SingleProduct from "./SingleProduct";
import { useMyContext } from "@/app/context/ShoppingCartContext";

const AllProducts = () => {
  const { products, sortByPrice, inStock, delivery, searchQuery } =
    useMyContext();

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
    qty: number;
    // viewId: string;
  }

  // const [allProducts, setAllProducts] = useState<product[]>([]);

  useEffect(() => {
    if (shoppingData?.length) {
      localStorage.setItem("products", JSON.stringify(shoppingData));
      // setAllProducts(shoppingData);
    }
  }, []);

  const transformedProducts = () => {
    let newFilteredProducts = products;

    if (sortByPrice) {
      newFilteredProducts = newFilteredProducts.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);

        return sortByPrice === "lowToHigh" ? priceA - priceB : priceB - priceA;
      });
    }

    if (inStock) {
      newFilteredProducts = newFilteredProducts.filter((item) => item.inStock);
    }

    if (delivery) {
      newFilteredProducts = newFilteredProducts.filter((item) => item.delivery);
    }

    if (searchQuery) {
      newFilteredProducts = newFilteredProducts.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
      );
    }

    return newFilteredProducts;
  };

  return (
    <div className=" h-auto w-full flex justify-between items-start flex-row flex-wrap">
      {/* {allProducts?.map((item: product) => (
        <SingleProduct item={item} key={item.id} />
      ))} */}
      {transformedProducts()?.map((item: product) => (
        <SingleProduct item={item} key={item.id} />
      ))}
    </div>
  );
};

export default AllProducts;
