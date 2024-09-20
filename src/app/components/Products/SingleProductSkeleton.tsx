import { useMyContext } from "@/app/context/ShoppingCartContext";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// SingleProductSkeleton component with dark mode support
const SingleProductSkeleton = () => {
  const { isDarkMode } = useMyContext();

  // Set dark and light mode colors
  const skeletonBaseColor = isDarkMode == "dark" ? "#333333" : "#e0e0e0"; // Dark mode base color
  const skeletonHighlightColor = isDarkMode == "dark" ? "#444444" : "#f5f5f5"; // Dark mode highlight color

  return (
    <div className="h-auto w-80 mx-0 mb-5 rounded-md transition-all bg-white dark:bg-gray-950">
      <div className="h-80 w-full">
        <Skeleton
          height={320}
          className="rounded-sm"
          baseColor={skeletonBaseColor}
          highlightColor={skeletonHighlightColor}
        />
      </div>
      <div className="pt-3 mt-5 bg-gradient-to-r from-white to-gray-100 rounded-md dark:from-gray-800">
        <div className="px-3">
          <Skeleton
            width="80%"
            height={30}
            className="mb-2"
            baseColor={skeletonBaseColor}
            highlightColor={skeletonHighlightColor}
          />
          <Skeleton
            width="60%"
            height={20}
            className="mb-1"
            baseColor={skeletonBaseColor}
            highlightColor={skeletonHighlightColor}
          />
          <Skeleton
            width="50%"
            height={20}
            baseColor={skeletonBaseColor}
            highlightColor={skeletonHighlightColor}
          />
          <div className="mt-2">
            <Skeleton
              width={90}
              height={25}
              className="rounded-md"
              baseColor={skeletonBaseColor}
              highlightColor={skeletonHighlightColor}
            />
            <Skeleton
              width={140}
              height={20}
              className="mt-1"
              baseColor={skeletonBaseColor}
              highlightColor={skeletonHighlightColor}
            />
          </div>
        </div>
        <div className="h-auto w-full flex justify-between items-center flex-col mt-3 mb-0">
          <div className="h-auto w-full">
            <Skeleton
              // width={300}
              height={40}
              className="rounded-bl-md rounded-br-md"
              baseColor={skeletonBaseColor}
              highlightColor={skeletonHighlightColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductSkeleton;
