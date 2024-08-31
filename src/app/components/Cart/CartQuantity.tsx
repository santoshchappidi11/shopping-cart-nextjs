import React, { useState } from "react";

const CartQuantity = () => {
  const [count, setCount] = useState<number>(0);

  const IncrementCount = () => {
    if (count == 5) {
      setCount(5);
    }

    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count == 1) {
      setCount(1);
    }

    setCount(count - 1);
  };

  return (
    <div className="w-3/12 flex justify-center items-center">
      <button onClick={decrementCount}>-</button>
      <p className="w-5 flex justify-center items-center px-1 mx-1 rounded-sm border border-gray-300">
        {" "}
        {count}{" "}
      </p>
      <button onClick={IncrementCount}>+</button>
    </div>
  );
};

export default CartQuantity;
