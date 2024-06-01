import React, { useEffect, useState, useContext } from "react";
import logo from "/logo.png";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import Profile from "./Profile";
import useCart from "../hooks/useCart";

export default function Navbar() {
  const [isSticky, setSticky] = useState(false);

  const { user } = useContext(AuthContext);
  console.log(user);

  const [cart, refetch] = useCart();
  console.log(cart);

  const navItems = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <details>
          <summary>Menu</summary>
          <ul className="p-2">
            <li>
              <Link to={"/menu"}>All</Link>
            </li>
            <li>
              <Link to={"/salad"}>Salad</Link>
            </li>
            <li>
              <Link to={"/pizza"}>Pizza</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li>
              <Link to={"online_order"}>Online Order</Link>
            </li>
            <li>
              <Link to={"table_booking"}>Table Booking</Link>
            </li>
            <li>
              <Link to={"order_tracking"}>Order Tracking</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link to={"offer"}>Offers</Link>
      </li>
    </>
  );

  //handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out">
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out"
            : ""
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {/* Search Button */}
          <button className="btn btn-ghost btn-circle hidden lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Cart button */}
          <Link to="/cart"
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle mr-3 lg:flex hidden"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">{cart.length || 0}</span>
            </div>
          </Link>

          {/* Login button */}
          {user ? (
            <Profile user={user} />
          ) : (
            <button
              className="btn bg-green rounded-full px-6 text-white flex items-center gap-2"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              <FaRegUser /> Login
            </button>
          )}
          <Modal />
        </div>
      </div>
    </header>
  );
}
