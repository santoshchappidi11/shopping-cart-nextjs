"use client";

import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
// import { ShoppingProvider } from "@/app/context/ShoppingCartContext";

export default function Home() {
  return (
    <>
      {/* <ShoppingProvider>
      </ShoppingProvider> */}
      <Navbar />
      <HomePage />
    </>
  );
}
