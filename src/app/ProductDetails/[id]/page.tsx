"use client";

import { useMyContext } from "@/app/context/ShoppingCartContext";
import Image, { StaticImageData } from "next/image";
import { useParams } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SingleProductDetails = () => {
  const { inStock, delivery } = useMyContext();

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
      <div className="border border-black h-auto w-full py-5 px-10">
        <div className="border border-red-500 h-auto w-full flex justify-start items-center">
          <div className="h-96 w-1/2">
            {singleProduct?.image && (
              <Image
                src={singleProduct?.image}
                alt="product"
                className="h-full w-full object-contain"
              />
            )}
          </div>
          <div className="h-auto w-full border border-black">
            <div className="h-auto border border-green-500">
              <h2 className="font-extrabold text-2xl pb-5">
                {singleProduct?.fullName}
              </h2>
              <div className="">
                {/* <Rating rating={rating} numReviews={numReviews} /> */}
              </div>
              <div className="font-bold text-2xl pb-5">
                <span>₹ {singleProduct?.price}</span>
              </div>
              <div className="">
                <p className="pb-5 font-bold text-lg">
                  Status:
                  <span className="ml-2">
                    {singleProduct?.inStock ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-md text-base font-semibold">
                        {" "}
                        InStock
                      </span>
                    ) : (
                      <span className="bg-gray-500 text-white px-2 py-1 rounded-md text-base font-semibold">
                        Out of stock
                      </span>
                    )}
                  </span>
                </p>
              </div>
              {/* <div className="">
            {cart.some((item) => item.id === product.id) ? (
              <button
                className={styles["remove-btn"]}
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: product,
                  })
                }
              >
                Remove from cart
              </button>
            ) : (
              <button
                className={inStock ? styles["add-btn"] : styles["no-add-btn"]}
                onClick={() =>
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: product,
                  })
                }
              >
                Add to cart
              </button>
            )} */}
            </div>
            <div className="border border-green-500 h-auto w-4/12 p2-5">
              <div className="h-auto w-full flex justify-between items-center py-1">
                <label className="font-bold">Brand</label>
                <span className="w-2/6 text-left"> {singleProduct?.brand}</span>
              </div>
              <div className="h-auto w-full flex justify-between items-center py-1">
                <label className="font-bold">Color</label>
                <span className="w-2/6 text-left"> {singleProduct?.color}</span>
              </div>
              <div className="h-auto w-full flex justify-between items-center py-1">
                <label className="font-bold">Connectivity Technology</label>
                <span className="w-2/6 text-left">
                  {" "}
                  {singleProduct?.connectivity}
                </span>
              </div>
              <div className="h-auto w-full flex justify-between items-center py-1">
                <label className="font-bold">Model Name</label>
                <span className="w-2/6 text-left">
                  {" "}
                  {singleProduct?.modelname}
                </span>
              </div>
              <div className="h-auto w-full flex justify-between items-center py-1">
                <label className="font-bold">Ear Placement</label>
                <span className="w-2/6 text-left">
                  {" "}
                  {singleProduct?.formfactor}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5 pb-2">
          <h4 className="text-xl font-bold">Product Description</h4>
          <span className="text-lg">{singleProduct?.description}</span>
        </div>
      </div>
    </>
  );
};

export default SingleProductDetails;
