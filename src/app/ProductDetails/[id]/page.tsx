"use client";

import Rating from "@/app/components/Rating/Rating";
import { useMyContext } from "@/app/context/ShoppingCartContext";
import { faTruck, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image, { StaticImageData } from "next/image";
import { useParams } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SingleProductDetails = () => {
  // const { inStock, delivery } = useMyContext();

  const { id } = useParams();
  const singleProductId = id;

  console.log(singleProductId, "id here");

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

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    const allProducts: product[] = storedProducts
      ? JSON.parse(storedProducts)
      : [];
    setLocalStorageProducts(allProducts);
  }, []);

  useEffect(() => {
    if (typeof singleProductId === "string") {
      const productId = parseInt(singleProductId, 10); // Convert to number
      const singleProd = localStorageProducts?.find(
        (product) => product?.id === productId
      );

      if (singleProd) {
        setSingleProduct(singleProd);
      }
    }
  }, [singleProductId, localStorageProducts]);

  return (
    <>
      <div className="h-auto w-full py-5 px-10">
        <div className=" h-auto w-full flex justify-start items-start ">
          <div className=" sticky top-0 h-screen w-3/5 flex justify-start items-center pr-10">
            <div className="h-3/4 w-full border border-gray-300 py-12 bg-white rounded-md">
              {singleProduct?.image && (
                <Image
                  src={singleProduct?.image}
                  alt="product"
                  className="h-full w-full object-contain"
                />
              )}
            </div>
          </div>
          <div className="h-auto w-2/5">
            <div className="h-auto ">
              <h2 className="font-semibold text-2xl pb-5">
                {singleProduct?.fullName}
              </h2>
              <div className="my-5 border-t border-t-slate-200 border-b border-b-slate-200 py-5">
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
                      <span className="bg-gray-400 text-white px-2 py-1 rounded-md text-base font-medium">
                        Out of stock
                      </span>
                    )}
                  </span>
                </p>

                <div className="my-10">
                  <p className="text-base italic border-b border-b-gray-300">
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

              <div className="">
                <button className="h-auto w-auto p-2  bg-orange-600  text-white rounded-md">
                  Remove from cart
                </button>
                <button className="h-auto w-auto p-2   bg-blue-600 text-white rounded-md">
                  Add to cart
                </button>
              </div>
            </div>
            <div className="h-auto w-4/5 p2-5 my-10">
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
              <span className="text-base font-light">
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
