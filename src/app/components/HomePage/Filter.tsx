import React, { memo, useState, useEffect } from "react";
import { useMyContext } from "@/app/context/ShoppingCartContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Filter = () => {
  const {
    products,
    sortByPrice,
    inStock,
    delivery,
    dispatch,
    filterDispatch,
    connectivity,
    isDarkMode, // Assuming this is available from the context
  } = useMyContext();

  const [isLoading, setIsLoading] = useState(true);

  // Skeleton colors based on dark mode
  const skeletonBaseColor = isDarkMode === "dark" ? "#333333" : "#e0e0e0";
  const skeletonHighlightColor = isDarkMode === "dark" ? "#444444" : "#f5f5f5";

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a loading time of 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="rounded-sm h-auto w-full xl:w-1/5 lg:w-1/4 sm:w-2/5 pt-5 py-10 sm:sticky sm:top-24 sm:border-r border-r-gray-200 dark:sm:border-r-gray-700 top-0 mx-0">
        <Skeleton
          height={25}
          width="50%"
          baseColor={skeletonBaseColor}
          highlightColor={skeletonHighlightColor}
        />
        <div className="my-4">
          <Skeleton
            height={20}
            width="60%"
            baseColor={skeletonBaseColor}
            highlightColor={skeletonHighlightColor}
          />
          <Skeleton
            height={20}
            width="60%"
            baseColor={skeletonBaseColor}
            highlightColor={skeletonHighlightColor}
          />
        </div>
        <div className="my-4">
          <Skeleton
            height={25}
            width="50%"
            baseColor={skeletonBaseColor}
            highlightColor={skeletonHighlightColor}
          />
          <Skeleton
            height={20}
            width="60%"
            baseColor={skeletonBaseColor}
            highlightColor={skeletonHighlightColor}
          />
          <Skeleton
            height={20}
            width="60%"
            baseColor={skeletonBaseColor}
            highlightColor={skeletonHighlightColor}
          />
        </div>
        <div className="my-4">
          <Skeleton
            height={25}
            width="50%"
            baseColor={skeletonBaseColor}
            highlightColor={skeletonHighlightColor}
          />
          <Skeleton
            height={20}
            width="60%"
            baseColor={skeletonBaseColor}
            highlightColor={skeletonHighlightColor}
          />
        </div>
        <div className="my-4">
          <Skeleton
            height={25}
            width="50%"
            baseColor={skeletonBaseColor}
            highlightColor={skeletonHighlightColor}
          />
          <Skeleton
            height={20}
            width="60%"
            baseColor={skeletonBaseColor}
            highlightColor={skeletonHighlightColor}
          />
        </div>
        <Skeleton
          height={40}
          width="80%"
          baseColor={skeletonBaseColor}
          highlightColor={skeletonHighlightColor}
        />
      </div>
    );
  }

  return (
    <div className="rounded-sm h-auto w-full xl:w-1/5 lg:w-1/4 sm:w-2/5 my-10 pt-5 py-10 sm:sticky sm:top-24 sm:border-r border-r-gray-200 dark:sm:border-r-gray-800 top-0 mx-0">
      <div className="h-full w-full flex justify-between sm:items-start  items-center flex-col sm:pl-10  py-5">
        {/* Categories Section */}
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

        {/* Price Range Section */}
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

        {/* Availability Section */}
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

        {/* Services Section */}
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
