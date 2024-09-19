// "use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import banner1 from "../../../Images/banner.jpg";
import banner2 from "../../../Images/banner-2.jpg";
import banner4 from "../../../Images/banner-4.webp";
import AllProducts from "../Products/AllProducts";
import Filter from "./Filter";
import { useMyContext } from "@/app/context/ShoppingCartContext";

const HomePage = () => {
  const banners = [banner1, banner2, banner4];

  // State to track loading of banners
  const [isBannerLoading, setIsBannerLoading] = useState(true);
  const { isDarkMode } = useMyContext(); // Getting dark mode value from context

  // Skeleton colors based on dark mode

  const skeletonBaseColor = isDarkMode === "dark" ? "#333333" : "#e0e0e0";
  const skeletonHighlightColor = isDarkMode === "dark" ? "#444444" : "#f5f5f5";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBannerLoading(false);
    }, 2000); // Simulate a loading time of 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Banner Section */}
      <div className="h-auto w-11/12 m-auto sm:mt-40 mb-20 mt-52 ">
        {banners.map((banner, i) => (
          <div key={i} className="mb-0 h-full w-full ">
            {isBannerLoading ? (
              // Skeleton while loading with dark mode colors
              <Skeleton
                height={384}
                width="100%"
                baseColor={skeletonBaseColor}
                highlightColor={skeletonHighlightColor}
              />
            ) : (
              <Image
                src={banner}
                alt={`banner-${i}`}
                className="sm:h-full h-96 w-full object-cover"
                onLoad={() => setIsBannerLoading(false)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Filter and Products Section */}
      <div className="5xl:flex-col sm:flex justify-between items-start px-5">
        <Filter />
        <div className="lg:w-4/5 md:w-2/3">
          {/* AllProducts component will have its own skeleton loader */}
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
