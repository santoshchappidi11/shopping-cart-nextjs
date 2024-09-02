import { useMyContext } from "@/app/context/ShoppingCartContext";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    // console.log(item, "id here");

    dispatch({
      type: "INCREMENT_QTY",
      payload: item,
    });
  };

  const decrementCount = (item: any) => {
    // console.log(item, "id here");

    dispatch({
      type: "DECREMENT_QTY",
      payload: item,
    });
  };

  useEffect(() => {
    setCount(item?.qty);
  }, [item]);

  return (
    <div className="w-1/5 flex justify-center items-center">
      {/* <button onClick={() => decrementCount(item)}>-</button> */}
      <FontAwesomeIcon
        icon={faMinus}
        size="sm"
        onClick={() => decrementCount(item)}
        className="cursor-pointer"
      />
      <p className="w-6 flex justify-center items-center px-1 mx-1 rounded-sm border border-gray-300 bg-white text-red-600 text-lg">
        {" "}
        {item?.qty}{" "}
      </p>
      <FontAwesomeIcon
        icon={faPlus}
        size="sm"
        onClick={() => IncrementCount(item)}
        className="cursor-pointer"
      />
      {/* <button onClick={() => IncrementCount(item)}>+</button> */}
    </div>
  );
};

export default CartQuantity;
