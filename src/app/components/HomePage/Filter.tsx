import React, { memo } from "react";
import { useMyContext } from "@/app/context/ShoppingCartContext";

const Filter = () => {
  const {
    products,
    sortByPrice,
    inStock,
    delivery,
    dispatch,
    filterDispatch,
    connectivity,
  } = useMyContext();

  return (
    <div className="rounded-sm h-auto w-full xl:w-1/5 lg:w-1/4 sm:w-2/5 pt-5 py-10 sm:sticky sm:top-24 sm:border-r border-r-gray-200 dark:sm:border-r-gray-700 top-0 mx-0">
      <div className="h-full w-full flex justify-between sm:items-start  items-center flex-col sm:pl-10  py-5">
        <div className="h-auto sm:w-full flex justify-center sm:items-start flex-col my-4">
          <h2 className="text-gray-600 dark:text-gray-400">Categories</h2>
          <label className="mb-4 mt-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="connectivity"
              className="accent-red-500"
              onChange={() => {
                filterDispatch({
                  type: "FILTER_BY_WIRE",
                  payload: "Wireless",
                });
              }}
              checked={connectivity == "Wireless" ? true : false}
            />{" "}
            Wireless
          </label>
          <label className="mb-4 text-sm cursor-pointer">
            <input
              type="radio"
              name="connectivity"
              className="accent-red-500"
              onChange={() => {
                filterDispatch({
                  type: "FILTER_BY_WIRE",
                  payload: "Wired",
                });
              }}
              checked={connectivity == "Wired" ? true : false}
            />{" "}
            Wired
          </label>
        </div>
        <div className="h-auto sm:w-full flex justify-center sm:items-start flex-col my-4">
          <h2 className="text-gray-600 dark:text-gray-400">Price Range</h2>
          <label className="mb-4 mt-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="sorting"
              className="accent-red-500"
              onChange={() => {
                filterDispatch({
                  type: "FILTER_BY_PRICE",
                  payload: "highToLow",
                });
              }}
              checked={sortByPrice == "highToLow" ? true : false}
            />{" "}
            High Price
          </label>
          <label className="mb-4 text-sm cursor-pointer">
            <input
              type="radio"
              name="sorting"
              className="accent-red-500"
              onChange={() => {
                filterDispatch({
                  type: "FILTER_BY_PRICE",
                  payload: "lowToHigh",
                });
              }}
              checked={sortByPrice == "lowToHigh" ? true : false}
            />{" "}
            Low Price
          </label>
        </div>
        <div className="h-auto sm:w-full flex justify-center sm:items-start flex-col my-4">
          <h2 className="text-gray-600 dark:text-gray-400">Availability</h2>
          <label className="mb-4 mt-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="in stock only"
              className="accent-red-500"
              onChange={() => {
                filterDispatch({
                  type: "FILTER_BY_STOCK",
                });
              }}
              checked={inStock ? true : false}
            />{" "}
            In Stock Only
          </label>
        </div>
        <div className="h-auto sm:w-full flex justify-center sm:items-start flex-col my-4">
          <h2 className="text-gray-600 dark:text-gray-400">Services</h2>
          <label className="mb-4 mt-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="fast delivery"
              className="accent-red-500"
              onChange={() => {
                filterDispatch({
                  type: "FILTER_BY_DELIVERY",
                });
              }}
              checked={delivery ? true : false}
            />{" "}
            Fast Delivery
          </label>
        </div>
        <button
          className="px-6 py-1 rounded-md mt-2 cursor-pointer bg-black text-white hover:bg-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500"
          onClick={() => {
            filterDispatch({
              type: "CLEAR_ALL_FILTERS",
            });
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default memo(Filter);
