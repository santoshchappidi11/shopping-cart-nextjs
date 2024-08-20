import React from "react";

const Filter = () => {
  return (
    <div className="border border-gray-400 rounded-sm h-auto w-1/6 pt-5 py-10 sticky top-24">
      <h2 className="text-2xl font-bold text-black pl-10">Filters :</h2>
      <div className="h-auto w-full flex justify-center items-start flex-col pl-10">
        <label className="mb-4 mt-5">
          <input type="radio" name="sorting" /> High Price
        </label>
        <label className="mb-4">
          {" "}
          <input type="radio" name="sorting" /> Low Price
        </label>
        <label className="mb-4">
          <input type="checkbox" name="in stock only" /> In Stock Only
        </label>
        <label className="mb-4">
          <input type="checkbox" name="fast delivery" /> Fast Delivery
        </label>
        <button className="px-6 py-1 border border-black rounded-md mt-2 cursor-pointer ">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
