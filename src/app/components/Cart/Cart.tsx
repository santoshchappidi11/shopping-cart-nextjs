"use client";

import { faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useMyContext } from "@/app/context/ShoppingCartContext";
import CartQuantity from "./CartQuantity";
import toast from "react-hot-toast";
import emptyCartImage from "./../../../Images/empty-cart.png";
import Link from "next/link";

const Cart = () => {
  const { cartProducts, dispatch } = useMyContext();

  // console.log(cartProducts, "cart prod");

  const [total, setTotal] = useState<number>();
  const [discountedTotal, setDiscountedTotal] = useState<number>();
  const [actualDiscount, setActualDiscount] = useState<number>();
  const [totalItems, setTotalItems] = useState<number>();

  const currencyOptions: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  // CALCULATE TOTAL PRICE
  useEffect(() => {
    if (cartProducts) {
      const allPrices = cartProducts.reduce<number>(
        (acc, item) => acc + parseFloat(item.price) * item.qty,
        0
      );
      setTotal(allPrices);

      // Calculate 20% off
      const discount = 0.2;
      const finalPrice = allPrices - allPrices * discount;
      setDiscountedTotal(finalPrice);
      setActualDiscount(total && total - finalPrice);
    }
  }, [cartProducts, total]);

  useEffect(() => {
    const allItems = cartProducts.reduce<number>(
      (acc, item) => acc + item.qty,
      0
    );

    setTotalItems(allItems);
  }, [cartProducts]);

  // REMOVE PRODUCT FROM CART
  const handleRemoveFromCart = (product: any) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });

    toast.success("Item removed from cart!");
  };

  // CLEAR/CHECKOUT CART
  const handleCheckoutCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });

    if (cartProducts?.length > 0) {
      toast.success("Thank you for shopping!");
    } else {
      toast.error("Add items to cart to checkout!");
    }
  };

  return (
    <>
      <Navbar />

      <div className="h-auto w-full flex justify-center items-start mt-24 relative px-16">
        <div className="h-full w-3/4 py-5 pr-10">
          <div className="flex justify-between items-center pb-10">
            {cartProducts?.length > 0 && (
              <>
                <h2 className="font-semibold text-2xl">Cart Items</h2>
                <span className="text-gray-600 font-semibold text-lg">
                  {totalItems} Items
                </span>
              </>
            )}
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
                <CartQuantity
                  // handleRemoveFromCart={handleRemoveFromCart}
                  item={item}
                />
                <div>
                  <span>₹ {item?.price}</span>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faXmark}
                    size="xl"
                    className="cursor-pointer"
                    onClick={() => handleRemoveFromCart(item)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="h-96 w-full">
              <Image
                src={emptyCartImage}
                alt="empty-cart"
                className="h-full w-full object-contain"
              />
              <div className=" flex justify-center items-center ">
                <h2 className="text-xl font-medium text-gray-400">EMPTY!</h2>
              </div>
              <div className=" flex justify-center items-center mt-10">
                <Link href={"/"}>
                  {" "}
                  <h1 className="text-2xl font-bold cursor-pointer">
                    SHOP<span className="text-red-600">p</span> now!
                  </h1>
                </Link>
              </div>
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
              <p>{cartProducts?.length > 1 ? "ITEMS" : "ITEM"}</p>
              <span>{totalItems}</span>
            </div>
            <div className=" flex justify-between items-center px-5  pb-5">
              <p>TOTAL</p>
              <span>
                {" "}
                {total
                  ?.toLocaleString("en-IN", currencyOptions)
                  .replace("₹", "₹ ")}
              </span>
            </div>
            <div className=" flex justify-between items-center px-5  pb-5">
              <p>DISCOUNT (20% off)</p>
              <span>
                {actualDiscount
                  ?.toLocaleString("en-IN", currencyOptions)
                  .replace("₹", "₹ ")}
              </span>
            </div>
          </div>
          <div className="border-t border-t-gray-300 pt-5">
            <div className="flex justify-between items-center px-5 ">
              <h2>TOTAL PRICE</h2>
              <span>
                {" "}
                {discountedTotal
                  ?.toLocaleString("en-IN", currencyOptions)
                  .replace("₹", "₹ ")}
              </span>
            </div>
            <div className="w-full h-auto flex justify-center items-center">
              <button
                className="rounded-sm w-11/12 py-2 my-10 cursor-pointer bg-black text-white"
                onClick={() => handleCheckoutCart()}
              >
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
