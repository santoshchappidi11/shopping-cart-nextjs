import React from "react";

const Filter = () => {
  return (
    <div className="rounded-sm h-auto w-1/6 pt-5 py-10 sticky top-24">
      <div className="h-full w-full flex justify-between items-start flex-col pl-10 py-5">
        <div className="h-auto w-full flex justify-center items-start flex-col my-4">
          <h2 className="text-gray-600">Categories</h2>
          <label className="mb-4 mt-2 text-sm cursor-pointer">
            <input type="radio" name="sorting" className="" /> Wireless
          </label>
          <label className="mb-4 text-sm cursor-pointer">
            <input type="radio" name="sorting" /> Wired
          </label>
        </div>
        <div className="h-auto w-full flex justify-center items-start flex-col my-4">
          <h2 className="text-gray-600">Price Range</h2>
          <label className="mb-4 mt-2 text-sm cursor-pointer">
            <input type="radio" name="sorting" className="" /> High Price
          </label>
          <label className="mb-4 text-sm cursor-pointer">
            <input type="radio" name="sorting" /> Low Price
          </label>
        </div>
        <div className="h-auto w-full flex justify-center items-start flex-col my-4">
          <h2 className="text-gray-600">Availability</h2>
          <label className="mb-4 mt-2 text-sm cursor-pointer">
            <input type="checkbox" name="in stock only" /> In Stock Only
          </label>
        </div>
        <div className="h-auto w-full flex justify-center items-start flex-col my-4">
          <h2 className="text-gray-600">Services</h2>
          <label className="mb-4 mt-2 text-sm cursor-pointer">
            <input type="checkbox" name="fast delivery" /> Fast Delivery
          </label>
        </div>
        <button className="px-6 py-1 border border-gray-400 rounded-md mt-2 cursor-pointer ">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
