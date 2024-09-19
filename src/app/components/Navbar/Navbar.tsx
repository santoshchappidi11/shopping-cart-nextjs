"use client";

import {
  faMagnifyingGlass,
  faMoon,
  faShoppingBag,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useMyContext } from "@/app/context/ShoppingCartContext";

const Navbar = () => {
  const { cartProducts, filterDispatch, setIsDarkMode, isDarkMode } =
    useMyContext();
  const [theme, setTheme] = useState<string>("light");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state with a timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust the timer for skeleton loading duration
    return () => clearTimeout(timer);
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme); // Persist theme in localStorage
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    // Load theme from localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      setIsDarkMode(storedTheme);
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [setIsDarkMode]);

  const handleSearchQuery = (e: any) => {
    filterDispatch({
      type: "FILTER_BY_SEARCH",
      payload: e.target.value,
    });
  };

  const skeletonBaseColor = isDarkMode == "dark" ? "#333333" : "#e0e0e0"; // Dark mode base color
  const skeletonHighlightColor = isDarkMode == "dark" ? "#444444" : "#f5f5f5"; // Dark mode highlight color

  return (
    <div className="h-auto w-full sm:p-0 pt-2 border border-gray-200 dark:border-gray-800 sm:px-10 px-5 fixed top-0 bg-white dark:bg-gray-950 z-20">
      {isLoading ? (
        <div className="w-full h-auto flex justify-between items-center py-5">
          <Skeleton
            width={150}
            height={40}
            baseColor={skeletonBaseColor}
            highlightColor={skeletonHighlightColor}
          />
          <div className="sm:flex justify-center items-center w-1/2 hidden">
            <Skeleton
              width={500}
              height={40}
              baseColor={skeletonBaseColor}
              highlightColor={skeletonHighlightColor}
            />
          </div>
          <Skeleton
            circle
            width={40}
            height={40}
            baseColor={skeletonBaseColor}
            highlightColor={skeletonHighlightColor}
          />
          <Skeleton
            circle
            width={40}
            height={40}
            baseColor={skeletonBaseColor}
            highlightColor={skeletonHighlightColor}
          />
        </div>
      ) : (
        <div className="w-full h-auto flex justify-between items-center">
          <div className="w-auto">
            <Link href={"/"}>
              <h1 className="text-3xl font-bold cursor-pointer">
                SHOP<span className="text-red-600">p</span>
              </h1>
            </Link>
          </div>
          <div className="w-1/2 h-20 sm:flex justify-center items-center hidden">
            <div className="md:w-5/6 flex justify-center items-center border border-gray-400 dark:border-gray-600 rounded-md px-1 dark:bg-gray-800">
              <input
                type="text"
                placeholder="search something..."
                className="w-11/12 h-10 outline-none dark:bg-gray-800"
                onChange={handleSearchQuery}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size="xl"
                className="cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="py-2 px-3 bg-gray-200 dark:bg-gray-800 rounded-md"
          >
            {theme === "light" ? (
              <FontAwesomeIcon icon={faMoon} size="lg" />
            ) : (
              <FontAwesomeIcon icon={faSun} size="lg" />
            )}
          </button>
          <Link href={"/CartPage"}>
            <div className="w-auto flex justify-center items-center border border-gray-200 dark:border-gray-800 rounded-md p-2">
              <FontAwesomeIcon
                icon={faShoppingBag}
                size="2xl"
                className="h-10 w-10 cursor-pointer"
              />
              {cartProducts?.length > 0 && (
                <p className="cursor-pointer text-lg bg-gray-200 dark:bg-gray-800 rounded-md p-1 mx-1">
                  <b className="text-2xl mx-1">{cartProducts?.length}</b>
                </p>
              )}
            </div>
          </Link>
        </div>
      )}
      {isLoading ? (
        <>
          {" "}
          <div className="flex justify-center items-center h-20 w-full sm:hidden">
            <Skeleton
              width={300}
              height={40}
              baseColor={skeletonBaseColor}
              highlightColor={skeletonHighlightColor}
              className="mx-10"
            />
          </div>
        </>
      ) : (
        <div className="w-full h-20 flex justify-center items-center sm:hidden">
          <div className="w-full flex justify-center items-center border border-gray-400 dark:border-gray-600 rounded-md px-1 dark:bg-gray-800">
            <input
              type="text"
              placeholder="search something..."
              className="w-11/12 h-10 outline-none dark:bg-gray-800"
              onChange={handleSearchQuery}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="xl"
              className="cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
