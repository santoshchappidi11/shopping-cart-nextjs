"use client";

import Navbar from "@/app/components/Navbar/Navbar";
import Rating from "@/app/components/Rating/Rating";
import { useMyContext } from "@/app/context/ShoppingCartContext";
import {
  faShoppingBag,
  faTruck,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image, { StaticImageData } from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SingleProductDetails = () => {
  const { cartProducts, dispatch } = useMyContext();

  console.log(cartProducts, "cart products");

  const { id } = useParams();
  const singleProductId = id;

  interface product {
    id: number;
    name: string;
    fullName: string;
    image: StaticImageData;
    price: string;
    rating: number;
    numReviews: number;
    inStock: boolean;
    delivery: boolean;
    brand: string;
    color: string;
    connectivity: string;
    modelname: string;
    formfactor: string;
    description: string;
  }

  const [localStorageProducts, setLocalStorageProducts] = useState<product[]>(
    []
  );

  const [singleProduct, setSingleProduct] = useState<product>();
  const [isAddToCart, setIsAddToCart] = useState(false);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    const allProducts: product[] = storedProducts
      ? JSON.parse(storedProducts)
      : [];
    setLocalStorageProducts(allProducts);
  }, []);

  useEffect(() => {
    if (typeof singleProductId === "string") {
      const productId = parseInt(singleProductId, 10);
      const singleProd = localStorageProducts?.find(
        (product) => product?.id === productId
      );

      if (singleProd) {
        setSingleProduct(singleProd);
      }
    }
  }, [singleProductId, localStorageProducts]);

  const handleAddToCart = (product: any) => {
    setIsAddToCart(true);

    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });

    toast.success("Item added to cart!");
  };

  const handleRemoveFromCart = (product: any) => {
    setIsAddToCart(false);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });

    toast.success("Item removed from cart!");
  };

  return (
    <>
      <Navbar />
      <div className="h-auto w-full py-5 px-10 mt-20 dark:bg-gray-950 dark:text-white">
        <div className=" h-auto w-full lg:flex justify-center lg:items-start">
          <div className="lg:sticky lg:top-2 h-screen lg:w-3/5 flex justify-start items-center lg:pr-10  ">
            <div className="h-4/5 w-full border border-gray-300 py-12 bg-white rounded-md dark:bg-gray-950 dark:border-gray-800">
              {singleProduct?.image && (
                <Image
                  src={singleProduct?.image}
                  alt="product"
                  className="h-full w-full object-contain"
                />
              )}
            </div>
          </div>
          <div className="h-auto lg:w-2/5 mt-16 bg-gradient-to-r from-white to-gray-100 px-5 py-5 rounded-md  dark:from-gray-900">
            <div className="h-auto">
              <h2 className="h-full w-full font-medium lg:font-semibold text-2xl pb-5 text-wrap">
                {singleProduct?.fullName}
              </h2>
              <div className="my-5 border-t border-t-slate-200 border-b border-b-slate-200 py-5 dark:border-t-slate-800 dark:border-b-slate-800 ">
                <Rating
                  rating={singleProduct?.rating || 0}
                  numReviews={singleProduct?.numReviews || 0}
                />
              </div>
              <div className="font-medium text-2xl pb-5">
                <span>₹ {singleProduct?.price}</span>
              </div>
              <div className="">
                <p className="pb-5 font-semibold text-lg">
                  Status:
                  <span className="ml-2">
                    {singleProduct?.inStock ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-md text-base font-medium">
                        {" "}
                        InStock
                      </span>
                    ) : (
                      <span className="bg-gray-400 text-white px-2 py-1 rounded-md text-base font-medium dark:bg-gray-700">
                        Out of stock
                      </span>
                    )}
                  </span>
                </p>

                <div className="my-10">
                  <p className="text-base italic border-b border-b-gray-300 dark:border-b-slate-800 ">
                    {singleProduct?.delivery
                      ? "Fast delivery"
                      : "delivery in 4 days"}{" "}
                    {singleProduct?.delivery ? (
                      <FontAwesomeIcon
                        icon={faTruckFast}
                        size="lg"
                        className="text-red-700"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTruck}
                        size="lg"
                        className="text-red-700"
                      />
                    )}{" "}
                  </p>
                </div>
              </div>

              <div className="my-1">
                {cartProducts?.find((item) => item.id == singleProduct?.id) ? (
                  <button
                    className="h-auto w-auto px-4 py-2 bg-red-600 text-white rounded-md"
                    onClick={() => handleRemoveFromCart(singleProduct)}
                  >
                    Remove from{" "}
                    <FontAwesomeIcon icon={faShoppingBag} className="ml-1" />
                  </button>
                ) : (
                  <button
                    className={`${
                      !singleProduct?.inStock &&
                      "pointer-events-none cursor-not-allowed"
                    } h-auto w-auto px-4 py-2 bg-black text-white rounded-md dark:bg-gray-100 dark:text-black`}
                    onClick={() => handleAddToCart(singleProduct)}
                  >
                    Add to{" "}
                    <FontAwesomeIcon icon={faShoppingBag} className="ml-1" />
                  </button>
                )}
              </div>
            </div>
            <div className="h-auto sm:w-4/5 w-full p2-5 my-10 ">
              <div className="h-auto w-full flex justify-between items-center py-2">
                <label className="font-semibold">Brand</label>
                <span className="w-2/6 text-left"> {singleProduct?.brand}</span>
              </div>
              <div className="h-auto w-full flex justify-between items-center py-2">
                <label className="font-semibold">Color</label>
                <span className="w-2/6 text-left"> {singleProduct?.color}</span>
              </div>
              <div className="h-auto w-full flex justify-between items-center py-2">
                <label className="font-semibold">Connectivity Technology</label>
                <span className="w-2/6 text-left">
                  {" "}
                  {singleProduct?.connectivity}
                </span>
              </div>
              <div className="h-auto w-full flex justify-between items-center py-2">
                <label className="font-semibold">Model Name</label>
                <span className="w-2/6 text-left">
                  {" "}
                  {singleProduct?.modelname}
                </span>
              </div>
              <div className="h-auto w-full flex justify-between items-center py-1">
                <label className="font-semibold">Ear Placement</label>
                <span className="w-2/6 text-left">
                  {" "}
                  {singleProduct?.formfactor}
                </span>
              </div>
            </div>

            <div className="pt-5 pb-2">
              <h4 className="text-xl font-bold">Product Description</h4>
              <span className="text-sm font-light text-pretty">
                {singleProduct?.description}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductDetails;
