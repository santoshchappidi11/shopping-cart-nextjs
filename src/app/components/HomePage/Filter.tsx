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

  // console.log(products);

  return (
    <div className="rounded-sm h-auto w-1/6 pt-5 py-10 sticky top-24">
      <div className="h-full w-full flex justify-between items-start flex-col pl-10 py-5">
        <div className="h-auto w-full flex justify-center items-start flex-col my-4">
          <h2 className="text-gray-600">Categories</h2>
          <label className="mb-4 mt-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="connectivity"
              className=""
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
        <div className="h-auto w-full flex justify-center items-start flex-col my-4">
          <h2 className="text-gray-600">Price Range</h2>
          <label className="mb-4 mt-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="sorting"
              className=""
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
        <div className="h-auto w-full flex justify-center items-start flex-col my-4">
          <h2 className="text-gray-600">Availability</h2>
          <label className="mb-4 mt-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="in stock only"
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
        <div className="h-auto w-full flex justify-center items-start flex-col my-4">
          <h2 className="text-gray-600">Services</h2>
          <label className="mb-4 mt-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="fast delivery"
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
          className="px-6 py-1 border border-gray-400 rounded-md mt-2 cursor-pointer "
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
