// "use client";

import Image from "next/image";
import React from "react";
import banner1 from "../../../Images/banner.jpg";
import banner2 from "../../../Images/banner-2.jpg";
import banner4 from "../../../Images/banner-4.webp";
import AllProducts from "../Products/AllProducts";
import Filter from "./Filter";

const HomePage = () => {
  const banners = [banner1, banner2, banner4];

  return (
    <div className="">
      <div className="h-auto w-11/12 m-auto sm:mt-40 mb-20 mt-52 ">
        {banners.map((banner, i) => (
          <div key={i} className="mb-0 h-full w-full ">
            <Image
              src={banner}
              alt="banner"
              className="sm:h-full h-96 w-full object-cover"
            />
          </div>
        ))}
        <div>
          {/* <div className="relative h-auto ">
            <video
              src="https://cdn.opstatics.com/store/20170907/assets/images/events/2020/07/tws/video/oneplus-mob-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-96 object-cover z-10"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-12 will-change-transform"></div>
          </div> */}
        </div>
      </div>
      <div className="5xl:flex-col sm:flex justify-between items-start px-5">
        <Filter />
        <div className="lg:w-4/5 md:w-2/3">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
