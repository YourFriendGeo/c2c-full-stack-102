import React from "react";
import acct from "../images/acct.png";
import logo from "../images/logo.png";
import cartlogo from "../images/cartlogo.png";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <>
      <div className="nav">
        <div className="nav-items">
          <img className="icons" id= 'logo'src={logo} alt=""></img>
          <input
            type="text"
            className="search-box"
            placeholder="search"
          ></input>
          <button className="search-btn">search</button>

          <img className="icons" src={acct} alt=""></img>

          <Link to="/cart" id="cart-btn">
            Cart (
            {/* TODO: Replace this fallback count with real cart state in Lesson 9. */}
            {props.length ?? 0})
            <img src={cartlogo} alt=""></img>
          </Link>
        </div>
        <div id="links">
          <Link className="navlink" to="/">
            Home
          </Link>
          <Link className="navlink" to="/shopping">
            Shopping
          </Link>
          <Link className="navlink" to="/about">
            About Us
          </Link>
          <Link className="navlink" to="/contact">
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;

