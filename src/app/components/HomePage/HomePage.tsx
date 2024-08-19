import Image from "next/image";
import React from "react";
import banner1 from "../../../Images/banner.jpg";
import banner2 from "../../../Images/banner-2.jpg";
import banner3 from "../../../Images/banner-3.jpg";

const HomePage = () => {
  const banners = [banner2, banner1, banner3];

  return (
    <div className="h-auto w-11/12 m-auto mt-36 mb-20">
      {banners.map((banner, i) => (
        <div key={i} className="mb-16 h-auto">
          <Image src={banner} alt="banner" />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
