"use client";

import { faNoteSticky, faXmark } from "@fortawesome/free-solid-svg-icons";
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

  const [total, setTotal] = useState<number>();
  const [discountedTotal, setDiscountedTotal] = useState<number>();
  const [actualDiscount, setActualDiscount] = useState<number>();
  const [totalItems, setTotalItems] = useState<number>();
  const [deliveryCharges, setDeliveryCharges] = useState<number>(50);
  const [saving, setSaving] = useState<number>(0);

  console.log(total, "total");
  console.log(discountedTotal, "total after dicount");

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
      setDiscountedTotal(
        finalPrice > 0 ? finalPrice + deliveryCharges : finalPrice
      );
      setActualDiscount(total && total - finalPrice);
    }

    if (total && discountedTotal) {
      setSaving(total - discountedTotal);
    } else {
      setSaving(0);
    }

    if (total && total >= 2000) {
      setDeliveryCharges(0);
    } else {
      setDeliveryCharges(50);
    }
  }, [cartProducts, total, deliveryCharges, discountedTotal]);

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

    localStorage.removeItem("cart");

    if (cartProducts?.length > 0) {
      toast.success("Thank you for shopping!");
    } else {
      toast.error("Add items to cart to checkout!");
    }
  };

  return (
    <>
      <Navbar />

      <div className="h-auto w-full lg:flex justify-center items-center lg:items-start mt-24 relative lg:px-16 px-5 dark:bg-gray-950 dark:text-white">
        <div className="h-full xl:w-3/4 lg:w-3/5 w-full py-5 md:pr-10 pr-0">
          <div className="flex justify-between items-center pb-10">
            {cartProducts?.length > 0 && (
              <>
                <h2 className="font-semibold text-2xl uppercase">Cart</h2>
                <span className="text-gray-600 font-semibold text-lg dark:text-gray-400">
                  {totalItems} Items
                </span>
              </>
            )}
          </div>

          {cartProducts?.length ? (
            cartProducts?.map((item) => (
              <div
                className="h-32 w-full flex justify-between items-center my-2 py-2 px-5 bg-gradient-to-r from-white to-gray-100 rounded-md dark:from-gray-950 dark:to-gray-800"
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
                  <p className="md:text-base text-sm">
                    {item.name.slice(0, 25)}...
                  </p>
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
                    size="lg"
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
                    SHOP<span className="text-red-600 font-bold">p</span> now!
                  </h1>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="h-auto xl:w-2/6 lg:w-2/5 w-full flex justify-center items-center sticky lg:top-24">
          {" "}
          <div className="h-auto xl:w-full lg:w-full md:w-2/3 w-full rounded-md  bg-gray-100 mt-7 dark:bg-gray-900">
            <div className="pt-5 flex justify-center items-center bg-gray-200 dark:bg-gray-800 rounded-t-sm">
              <h2 className="text-2xl font-medium px-5 pb-5 uppercase">
                <FontAwesomeIcon icon={faNoteSticky} /> Summary
              </h2>
            </div>
            <div className="pt-5 pb-2">
              <div className=" flex justify-between items-center px-5 pb-5 font-medium">
                <p className="uppercase text-gray-700 dark:text-gray-400">
                  {cartProducts?.length > 1 ? "total items" : "item"}
                </p>
                <span className="text-red-600 dark:text-red-500 font-medium">
                  {totalItems}
                </span>
              </div>
              <div className=" flex justify-between items-center px-5  pb-5 font-medium">
                <p className="uppercase text-gray-700 dark:text-gray-400">
                  item total
                </p>
                <span className="text-red-600 dark:text-red-500 font-medium">
                  {" "}
                  {total
                    ?.toLocaleString("en-IN", currencyOptions)
                    .replace("₹", "₹ ")}
                </span>
              </div>
              <div className=" flex justify-between items-center px-5  pb-5 font-medium">
                <p className="uppercase text-gray-700 dark:text-gray-400">
                  discount{" "}
                  <span className="lowercase font-medium">(20% off)</span>
                </p>
                <span className="text-red-600 dark:text-red-500 font-medium">
                  {actualDiscount
                    ?.toLocaleString("en-IN", currencyOptions)
                    .replace("₹", "₹ ")}
                </span>
              </div>
              <div className=" flex justify-between items-center px-5 pb-5 font-medium">
                <div>
                  <p className="text-wrap w-auto uppercase text-gray-700 dark:text-gray-400">
                    delivery charges
                  </p>
                </div>
                <span className="text-red-600 dark:text-red-500 font-medium">
                  {deliveryCharges
                    ?.toLocaleString("en-IN", currencyOptions)
                    .replace("₹", "₹ ")}
                </span>
              </div>
              <p className="text-xs w-full text-center text-gray-600 font-normal dark:text-gray-500">
                Min purchase has to be 2000 or more for free delivery.
              </p>
            </div>
            <div className="border-t border-t-gray-300 pt-5 dark:border-t-gray-700">
              <div className="flex justify-between items-center px-4">
                <div>
                  {" "}
                  <h2 className="uppercase font-semibold text-xl dark:text-gray-50">
                    total price
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">
                    Incl. all taxes and charges
                  </p>
                </div>
                <div className="flex justify-center items-center flex-col">
                  {" "}
                  <span className="text-red-600 dark:text-red-500 text-xl font-semibold">
                    {" "}
                    {discountedTotal
                      ?.toLocaleString("en-IN", currencyOptions)
                      .replace("₹", "₹ ")}
                  </span>
                  <span className="uppercase text-xs text-green-600 dark:text-green-500 font-semibold bg-gray-200 px-1 py-1 dark:bg-gray-800">
                    saving{" "}
                    {saving
                      ?.toLocaleString("en-IN", currencyOptions)
                      .replace("₹", "₹ ")}
                  </span>
                </div>
              </div>
              <div className="w-full h-auto flex justify-center items-center bottom-0">
                <button
                  className="rounded-b-md w-full py-3 mt-5 cursor-pointer bg-black text-white hover:bg-gray-800 text-lg font-semibold dark:bg-gray-200 dark:hover:bg-gray-50 dark:text-gray-950"
                  onClick={() => handleCheckoutCart()}
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
