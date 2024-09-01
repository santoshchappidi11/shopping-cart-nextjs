// "use client";

import {
  faCartShopping,
  faShoppingBag,
  faTruck,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useRouter } from "next/router";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import Rating from "../Rating/Rating";
import { useMyContext } from "@/app/context/ShoppingCartContext";
import toast from "react-hot-toast";

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
}

interface singleProductProps {
  item: product;
}

const SingleProduct: React.FC<singleProductProps> = ({ item }) => {
  const { cartProducts, dispatch } = useMyContext();
  // const router = useRouter();

  const handleAddToCart = (item: any) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: item,
    });

    toast.success("Item added to cart!");
  };

  const handleRemoveFromCart = (item: any) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item,
    });

    toast.success("Item removed from cart!");
  };

  return (
    <div
      key={item.id}
      className="border border-gray-100 h-auto w-3/12 mx-8 mb-5 px-3 pt-3 pb-1 rounded-md bg-gray-100"
    >
      <div className="h-80 w-full">
        <Image
          src={item.image}
          alt="product"
          className="h-full w-full object-contain rounded-xl"
        />
      </div>
      <div className="px-2 py-2">
        <h1 className="text-xl font-medium my-2">{item.name}</h1>
        <p className="mb-1">
          <FontAwesomeIcon icon={faCartShopping} size="sm" />{" "}
          <span className="text-base">₹{item.price}</span>
        </p>
        <Rating rating={item.rating} numReviews={item.numReviews} />
        <div className="">
          <span
            className={
              item.inStock
                ? "bg-green-500 text-white px-2 rounded-md text-sm"
                : "text-white bg-gray-400 px-2 rounded-md text-sm"
            }
          >
            {item.inStock ? "In Stock" : "Out of stock"}
          </span>
          <p className="text-sm ">
            {item.delivery ? (
              <FontAwesomeIcon icon={faTruckFast} size="sm" />
            ) : (
              <FontAwesomeIcon icon={faTruck} size="sm" />
            )}{" "}
            {item.delivery ? "Fast delivery" : "delivery in 4 days"}{" "}
          </p>
        </div>
        <div className=" h-16 w-full flex justify-between items-center mt-1 mb-0">
          <Link
            href={`/ProductDetails/${item?.id}`}
            className="px-5 py-2 border border-gray-300 cursor-pointer rounded-md bg-gray-200"
          >
            View
          </Link>

          {cartProducts?.find((product) => product.id == item.id) ? (
            <button
              className="px-4 py-2 cursor-pointer rounded-md  bg-red-600 text-white"
              onClick={() => handleRemoveFromCart(item)}
            >
              Remove from <FontAwesomeIcon icon={faShoppingBag} />
            </button>
          ) : (
            <button
              className="px-8 py-2 cursor-pointer rounded-md  bg-black text-white"
              onClick={() => handleAddToCart(item)}
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
