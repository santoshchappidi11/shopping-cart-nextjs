import { useMyContext } from "@/app/context/ShoppingCartContext";
import React, { useCallback, useEffect, useState } from "react";

interface quantityProps {
  // handleRemoveFromCart: (id: number) => void;
  item: {
    id: number;
    qty: number;
  };
}

const CartQuantity: React.FC<quantityProps> = ({
  // handleRemoveFromCart,
  item,
}) => {
  const { dispatch } = useMyContext();
  const [count, setCount] = useState<number>(0);

  const IncrementCount = (item: any) => {
    console.log(item, "id here");

    dispatch({
      type: "INCREMENT_QTY",
      payload: item,
    });
  };

  const decrementCount = (item: any) => {
    console.log(item, "id here");

    dispatch({
      type: "DECREMENT_QTY",
      payload: item,
    });
  };

  useEffect(() => {
    setCount(item?.qty);
  }, [item]);

  return (
    <div className="w-3/12 flex justify-center items-center">
      <button onClick={() => decrementCount(item)}>-</button>
      <p className="w-5 flex justify-center items-center px-1 mx-1 rounded-sm border border-gray-300">
        {" "}
        {item?.qty}{" "}
      </p>
      <button onClick={() => IncrementCount(item)}>+</button>
    </div>
  );
};

export default CartQuantity;
