import React, { useEffect, useState } from "react";
import Cart from "../components/cart";
import axios from "axios";

const CartPage = () => {
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    axios.get("/api/ecommerce/cart").then((res) => {
      setCartList(res.data);
    });
  }, []);

  const removeFromCart = (cartId) => {
    axios.delete(`/api/ecommerce/cart/${cartId}`).then(() => {
      setCartList((prev) => prev.filter((item) => item.id !== cartId));
    });
  };

  return (
    <Cart
      cartList={cartList}
      onRemove={removeFromCart}
      showBack={false}
      showCheckout={true}
    />
  );
};

export default CartPage;
