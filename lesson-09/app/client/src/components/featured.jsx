import React from "react";
import productImg from '../images/productImg.png';

const Featured = () => {
  return (
    <>
      <div id="gallery-head">
        <h1> Gallery </h1>
      </div>
      <div id="card-container">
      <div class="featured-card">
          <img
            className="img"
            src={productImg}
            alt=""
          />
          <h3>Add a product here</h3>
        </div>

        <div class="featured-card">
          <img
            className="img"
            src={productImg}
            alt=""
          />
          <h3>Add a product here</h3>
        </div>

        <div class="featured-card">
          <img
            className="img"
            src={productImg}
            alt=""
          />
          <h3>Add a product here</h3>
        </div>

        <div class="featured-card">
          <img
            className="img"
            src={productImg}
            alt=""
          />
          <h3>Add a product here</h3>
        </div>

        <div class="featured-card">
          <img
            className="img"
            src={productImg}
            alt=""
          />
          <h3>Add a product here</h3>
        </div>
      </div>
    </>
  );
};

export default Featured;
