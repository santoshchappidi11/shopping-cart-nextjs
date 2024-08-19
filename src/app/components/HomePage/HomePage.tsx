import Image from "next/image";
import React from "react";
import banner1 from "../../../Images/banner.jpg";
import banner2 from "../../../Images/banner-2.jpg";
import banner3 from "../../../Images/banner-3.jpg";
import AllProducts from "../Products/AllProducts";

const HomePage = () => {
  const banners = [banner2, banner1, banner3];

  return (
    <>
      <div className="h-auto w-11/12 m-auto mt-36 mb-20">
        {banners.map((banner, i) => (
          <div key={i} className="mb-16 h-auto">
            <Image src={banner} alt="banner" />
          </div>
        ))}
      </div>
      <div className="border border-black flex justify-between items-start relative">
        <div className="border border-red-500 h-auto w-1/6 pt-5 py-10 sticky top-0">
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
        <div className="border border-green-500 w-4/5">
          <AllProducts />
        </div>
      </div>
    </>
  );
};

export default HomePage;
