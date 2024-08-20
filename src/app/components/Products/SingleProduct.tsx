import Image, { StaticImageData } from "next/image";
import React from "react";

interface product {
  id: number;
  name: string;
  image: StaticImageData;
  price: string;
  rating: number;
  numReviews: number;
  inStock: boolean;
  delivery: boolean;
  viewId: string;
}

interface singleProductProps {
  item: product;
}

const SingleProduct: React.FC<singleProductProps> = ({ item }) => {
  return (
    <div
      key={item.id}
      className="border border-gray-400 h-auto w-1/4 mx-8 mb-5 px-3 py-3 rounded-md"
    >
      <div className="h-80 w-full">
        <Image
          src={item.image}
          alt="product"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="px-1 py-2">
        <h1>{item.name}</h1>
        <p>₹{item.price}</p>
        <div>
          <span>{item.inStock ? "In Stock" : "Out of stock"}</span>
          <p>{item.delivery ? "Fast delivery" : "delivery in 4 days"}</p>
        </div>
        <button className="px-8 py-2 border border-black mr-2 cursor-pointer rounded-md">
          View
        </button>
        <button className="px-8 py-2 border border-black cursor-pointer rounded-md">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
