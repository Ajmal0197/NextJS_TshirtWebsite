"use client";
import React, { createContext, useState } from "react";

export const ProductCTX = createContext(null);

const Provider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  return (
    <ProductCTX.Provider value={{ cartItems, setCartItems }}>
      {children}
    </ProductCTX.Provider>
  );
};

export default Provider;
