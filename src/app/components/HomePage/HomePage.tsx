import Image from "next/image";
import React from "react";
import banner1 from "../../../Images/banner.jpg";
import banner2 from "../../../Images/banner-2.jpg";
import banner3 from "../../../Images/banner-3.jpg";
import AllProducts from "../Products/AllProducts";
import Filter from "./Filter";

const HomePage = () => {
  const banners = [banner1, banner2];

  return (
    <div className="">
      <div className="h-auto w-11/12 m-auto mt-36 mb-20">
        {banners.map((banner, i) => (
          <div key={i} className="mb-0 h-auto">
            <Image src={banner} alt="banner" className="" />
          </div>
        ))}
        <div>
          <div className="relative h-auto ">
            <video
              src="https://cdn.opstatics.com/store/20170907/assets/images/events/2020/07/tws/video/oneplus-mob-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-96 object-cover z-10"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-12 will-change-transform"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-start relative px-5">
        <Filter />
        <div className="w-4/5">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
