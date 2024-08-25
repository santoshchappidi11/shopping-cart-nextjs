import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SingleProductDetails = () => {
  const router = useRouter();

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
    if (typeof router.query.id === "string") {
      const productId = parseInt(router.query.id, 10); // Convert to number
      const singleProd = localStorageProducts?.find(
        (product) => product?.id === productId
      );

      if (singleProd) {
        setSingleProduct(singleProd);
      }
    }
  }, [router.query.id, localStorageProducts]);

  return (
    <>
      <div className="">
        <div className="">
          <div className="">
            {singleProduct?.image && (
              <Image src={singleProduct?.image} alt="product" />
            )}
          </div>
          <div className="">
            <h2>{singleProduct?.fullName}</h2>
            <div className="">
              {/* <Rating rating={rating} numReviews={numReviews} /> */}
            </div>
            <div className="">
              <span>₹ {singleProduct?.price}</span>
            </div>
            <div className="">
              <p>
                Status:
                <span>
                  {singleProduct?.inStock ? (
                    <span className=""> InStock</span>
                  ) : (
                    <span className="">Out of stock</span>
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
          <div className="">
            <div className="">
              <label>Brand</label>
              <span>{singleProduct?.brand}</span>
            </div>
            <div className="">
              <label>Color</label>
              <span> {singleProduct?.color}</span>
            </div>
            <div className="">
              <label>Connectivity Technology</label>
              <span> {singleProduct?.connectivity}</span>
            </div>
            <div className="">
              <label>Model Name</label>
              <span> {singleProduct?.modelname}</span>
            </div>
            <div className="">
              <label>Ear Placement</label>
              <span> {singleProduct?.formfactor}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <h4>Product description</h4>
        <span>{}</span>
      </div>
    </>
  );
};

export default SingleProductDetails;
