"use client";

import { faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useMyContext } from "@/app/context/ShoppingCartContext";
import CartQuantity from "./CartQuantity";

const Cart = () => {
  const { cartProducts } = useMyContext();

  const [total, setTotal] = useState<number>();

  return (
    <>
      <Navbar />

      <div className="h-auto w-full flex justify-center items-start mt-24 relative px-16">
        <div className="h-full w-3/4 py-5 pr-10">
          <div className="flex justify-between items-center pb-10">
            <h2 className="font-semibold text-2xl">Cart Items</h2>
            <span className="text-gray-600 font-semibold text-lg">
              {cartProducts?.length} Items
            </span>
          </div>

          {cartProducts?.length ? (
            cartProducts?.map((item) => (
              <div
                className="h-32 w-full flex justify-between items-center my-5 border-b border-gray-300 border-t border-t-gray-300 py-2"
                key={item.id}
              >
                <div className="h-full w-1/5 ">
                  <Image
                    src={item.image}
                    alt="earphone"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="w-1/5">
                  <p>{item.name}</p>
                </div>
                <CartQuantity />
                <div>
                  <span>₹ {item.price}</span>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faXmark}
                    size="xl"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))
          ) : (
            <div>
              <h2>No Products!</h2>
            </div>
          )}
        </div>
        <div className="h-auto w-1/4 rounded-md sticky top-24 bg-gray-100">
          <div className="pt-5">
            <h2 className="text-2xl font-medium px-5 border-b border-b-gray-300 pb-5">
              Summary
            </h2>
          </div>
          <div className="pt-5 pb-5">
            <div className=" flex justify-between items-center px-5 pb-5">
              <p>ITEMS</p>
              <span>{cartProducts?.length}</span>
            </div>
            <div className=" flex justify-between items-center px-5  pb-5">
              <p>TOTAL</p>
              <span>
                {cartProducts?.reduce((acc, item) => (acc += item.price), 0)}
              </span>
            </div>
            <div className=" flex justify-between items-center px-5  pb-5">
              <p>DISCOUNT (20% off)</p>
              <span>{800}</span>
            </div>
          </div>
          <div className="border-t border-t-gray-300 pt-5">
            <div className="flex justify-between items-center px-5 ">
              <h2>TOTAL PRICE</h2>
              <span>{800}</span>
            </div>
            <div className="w-full h-auto flex justify-center items-center">
              <button className="rounded-sm w-11/12 py-2 my-10 cursor-pointer bg-black text-white">
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
