import { useMyContext } from "@/app/context/ShoppingCartContext";
import {
  faMagnifyingGlass,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { cartProducts, filterDispatch } = useMyContext();

  const handleSearchQuery = (e: any) => {
    filterDispatch({
      type: "FILTER_BY_SEARCH",
      payload: e.target.value,
    });
  };

  return (
    <div className="h-auto w-full border border-gray-200 flex justify-between items-center md:px-20 px-8 fixed top-0 bg-white z-20">
      <div className="w-auto">
        <Link href={"/"}>
          {" "}
          <h1 className="text-3xl font-bold cursor-pointer">
            SHOP<span className="text-red-600">p</span>
          </h1>
        </Link>
      </div>
      <div className="w-1/2 h-20 flex justify-center items-center ">
        <div className="md:w-5/6 flex justify-center items-center border border-gray-400 rounded-md px-1">
          <input
            type="text"
            placeholder="search something..."
            className="w-11/12 h-10 outline-none"
            onChange={handleSearchQuery}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="xl"
            className="cursor-pointer"
          />
        </div>
      </div>
      <Link href={"/CartPage"}>
        <div className="w-auto flex justify-center items-center border border-gray-200 rounded-md p-2">
          <FontAwesomeIcon
            icon={faShoppingBag}
            size="2xl"
            className="h-10 w-10 cursor-pointer"
          />
          {cartProducts?.length > 0 && (
            <p className="cursor-pointer text-lg bg-gray-200 rounded-md p-1 mx-1">
              <b className="text-2xl mx-1">{cartProducts?.length}</b>
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
