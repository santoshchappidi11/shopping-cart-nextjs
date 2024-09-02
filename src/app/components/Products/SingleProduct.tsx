"use client";

import {
  faCartShopping,
  faShoppingBag,
  faTruck,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import Rating from "../Rating/Rating";
import { useMyContext } from "@/app/context/ShoppingCartContext";
import toast from "react-hot-toast";

interface Product {
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
}

interface SingleProductProps {
  item: Product;
}

const SingleProduct: React.FC<SingleProductProps> = ({ item }) => {
  const { cartProducts, dispatch } = useMyContext();

  const handleAddToCart = (item: Product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: item,
    });
    toast.success("Item added to cart!");
  };

  const handleRemoveFromCart = (item: Product) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item,
    });
    toast.success("Item removed from cart!");
  };

  return (
    <div className="h-auto w-80 mx-8 mb-5 pb-0  rounded-md transition-all bg-white">
      <Link
        href={`/ProductDetails/${item.id}`}
        className="block"
        aria-label={`View details of ${item.name}`}
      >
        <div className="h-80 w-full">
          <Image
            src={item.image}
            alt={item.name}
            className="h-full w-full object-contain rounded-md"
          />
        </div>
      </Link>
      <div className="pt-3 px-0 pb-0 mx-3 mt-5 bg-gradient-to-r from-white to-gray-100 rounded-md">
        <div className="px-3">
          {" "}
          <h1 className="text-xl font-medium my-2 leading-tight">
            {item.name}
          </h1>
          <p className="mb-1">
            <FontAwesomeIcon icon={faCartShopping} className="mr-1 text-sm" />
            <span className="text-base">₹{item.price}</span>
          </p>
          <Rating rating={item.rating} numReviews={item.numReviews} />
          <div className="mt-2">
            <span
              className={`px-2 rounded-md text-sm ${
                item.inStock
                  ? "bg-green-500 text-white"
                  : "bg-gray-400 text-white"
              }`}
            >
              {item.inStock ? "In Stock" : "Out of stock"}
            </span>
            <p className="text-sm mt-1">
              <FontAwesomeIcon
                icon={item.delivery ? faTruckFast : faTruck}
                className="mr-1 text-sm"
              />
              {item.delivery ? "Fast delivery" : "Delivery in 4 days"}
            </p>
          </div>
        </div>
        <div className="h-auto w-full flex justify-between items-center flex-col mt-3 mb-0">
          {cartProducts?.find((product) => product.id === item.id) ? (
            <button
              className="w-full px-4 py-2 cursor-pointer rounded-bl-md rounded-br-md bg-red-600 text-white hover:bg-red-500"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFromCart(item);
              }}
            >
              Remove from <FontAwesomeIcon icon={faShoppingBag} />
            </button>
          ) : (
            <button
              className="w-full px-8 py-2 cursor-pointer rounded-bl-md rounded-br-md bg-black text-white hover:bg-slate-800"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(item);
              }}
            >
              Add to <FontAwesomeIcon icon={faShoppingBag} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
