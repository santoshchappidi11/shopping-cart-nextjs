import React from "react";
import { useMyContext } from "@/app/context/ShoppingCartContext";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons/faXmarkCircle";
import Cart from "../components/Cart/Cart";

const CartPage = () => {
  return (
    <>
      <Cart />
    </>
  );
};

export default CartPage;
