import React, { useEffect } from "react";
import shoppingData from "@/app/store/data";
import Image, { StaticImageData } from "next/image";
import SingleProduct from "./SingleProduct";
import { useMyContext } from "@/app/context/ShoppingCartContext";
import emptyCartImage from "./../../../Images/empty-cart.png";

const AllProducts = () => {
  const {
    products,
    sortByPrice,
    inStock,
    delivery,
    searchQuery,
    connectivity,
  } = useMyContext();

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
  }

  useEffect(() => {
    if (shoppingData?.length) {
      localStorage.setItem("products", JSON.stringify(shoppingData));
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

    if (connectivity) {
      newFilteredProducts = newFilteredProducts.filter(
        (item) => item.connectivity === connectivity
      );
    }

    if (inStock) {
      newFilteredProducts = newFilteredProducts.filter((item) => item.inStock);
    }

    if (delivery) {
      newFilteredProducts = newFilteredProducts.filter((item) => item.delivery);
    }

    if (searchQuery) {
      newFilteredProducts = newFilteredProducts.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return newFilteredProducts;
  };

  const filteredProducts = transformedProducts();

  return (
    <div className="h-auto w-full flex justify-between items-start flex-row flex-wrap">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item: product) => (
          <SingleProduct item={item} key={item.id} />
        ))
      ) : (
        <div className="h-96 w-full mt-20 flex flex-col justify-center items-center">
          <Image
            src={emptyCartImage}
            alt="empty-cart"
            className="h-full w-full object-contain"
          />
          <h2 className="text-xl font-medium text-gray-400">No Items!</h2>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
