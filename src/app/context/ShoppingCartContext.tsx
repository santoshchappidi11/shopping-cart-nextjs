"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createContext, ReactNode, useContext, useReducer } from "react";
import shoppingData from "../store/data";
import { StaticImageData } from "next/image";

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
  qty: number;
}

interface myContextData {
  isDarkMode: string;
  setIsDarkMode: Dispatch<SetStateAction<string>>;
  products: product[];
  cartProducts: product[];
  connectivity: string;
  sortByPrice: string;
  inStock: boolean;
  delivery: boolean;
  searchQuery: string;
  dispatch: Dispatch<any>;
  filterDispatch: Dispatch<any>;
}

const shoppingContext = createContext<myContextData | undefined>(undefined);

const initialState = {
  products: shoppingData,
  cart: [],
};

const filterInitialState = {
  connectivity: "",
  sortByPrice: "",
  inStock: false,
  delivery: false,
  searchQuery: "",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOAD_LS_CART": {
      return {
        ...state,
        cart: action.payload,
      };
    }

    case "ADD_TO_CART": {
      return {
        ...state,
        cart: [...state.cart, { ...action.payload }],
      };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter((item: any) => item.id != action.payload.id),
      };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        cart: [],
      };
    }

    case "INCREMENT_QTY": {
      return {
        ...state,
        cart: state.cart.map((item: any) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        ),
      };
    }

    case "DECREMENT_QTY": {
      return {
        ...state,
        cart: state.cart
          .map((item: any) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty - 1 }
              : item
          )
          .filter((item: any) => item.qty > 0),
      };
    }

    default:
      return state;
  }
};

const filterReducer = (state: any, action: any) => {
  switch (action.type) {
    case "FILTER_BY_WIRE":
      return {
        ...state,
        connectivity: action.payload,
      };

    case "FILTER_BY_PRICE":
      return {
        ...state,
        sortByPrice: action.payload,
      };

    case "FILTER_BY_STOCK":
      return {
        ...state,
        inStock: !state.inStock,
      };

    case "FILTER_BY_DELIVERY":
      return {
        ...state,
        delivery: !state.delivery,
      };

    case "FILTER_BY_SEARCH":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "CLEAR_ALL_FILTERS":
      return {
        sortByPrice: "",
        inStock: false,
        delivery: false,
        searchQuery: "",
      };

    default:
      return state;
  }
};

export const ShoppingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    filterInitialState
  );
  const [isDarkMode, setIsDarkMode] = useState<string>("light");

  useEffect(() => {
    const localStorageCart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (localStorageCart) {
      dispatch({ type: "LOAD_LS_CART", payload: localStorageCart });
    }
  }, []);

  useEffect(() => {
    if (state.cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
  }, [state]);

  return (
    <shoppingContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        products: state.products,
        cartProducts: state.cart,
        connectivity: filterState.connectivity,
        sortByPrice: filterState.sortByPrice,
        inStock: filterState.inStock,
        delivery: filterState.delivery,
        searchQuery: filterState.searchQuery,
        dispatch: dispatch,
        filterDispatch: filterDispatch,
      }}
    >
      {children}
    </shoppingContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(shoppingContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a ShoppingProvider");
  }
  return context;
};
