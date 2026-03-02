import React, { useState, useEffect } from "react";

import NavBar from "../components/nav";
import Cart from "../components/cart";

import axios from "axios";

const PAGE_PRODUCTS = "products";
const PAGE_CART = "cart";

const Shopping = () => {
  const [cartList, setCartList] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/ecommerce/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (product) => {
    setCartList([...cartList, product]);
  };

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const renderProducts = () => (
    <>
      <header id="shopping-head">
        <button onClick={() => navigateTo(PAGE_CART)} id="goToCart">
          Go to Cart ({cartList.length})
        </button>
      </header>
      <div id="shopping">
        {products.map((product) => (
          <div key={product.id} id="product">
            <img src={product.image_url} alt="" />
            <h2>{product.name}</h2>
            <h3>{product.description}</h3>
            <h3>{product.price}</h3>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  );

  const removeFromCart = (productId) => {
    setCartList(
      cartList.filter((item) => (item.id || item.product_id) !== productId),
    );
  };

  const renderCart = () => (
    <Cart
      cartList={cartList}
      onRemove={removeFromCart}
      onBack={() => navigateTo(PAGE_PRODUCTS)}
      showBack={true}
      showCheckout={true}
    />
  );

  return (
    <div className="main">
      {renderProducts()}
      {page === PAGE_CART && renderCart()}
      <NavBar length={cartList.length} />
    </div>
  );
};

export default Shopping;
