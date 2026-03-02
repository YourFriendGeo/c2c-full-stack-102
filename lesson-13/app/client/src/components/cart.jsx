import React from "react";

const Cart = ({
  cartList = [],
  onRemove,
  onBack,
  showBack = true,
  showCheckout = true,
}) => (
  <div id="cart-container">
    {showBack && (
      <button onClick={onBack} id="products-btn">
        Back to Products
      </button>
    )}
    <h1 id="cart-title"> Cart </h1>
    {cartList.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      cartList.map((product, idx) => (
        <div className="card card-container" key={product.id || idx}>
          <div id="product">
            <img src={product.image_url || product.image} alt="" />
            <h2> {product.name} </h2>
            <h3> {product.description} </h3>
            <h3> {product.price} </h3>
            {onRemove && (
              <button onClick={() => onRemove(product.id || idx)}>
                Remove from Cart
              </button>
            )}
          </div>
        </div>
      ))
    )}
    {showCheckout && <button id="checkout-btn">Checkout</button>}
  </div>
);

export default Cart;
