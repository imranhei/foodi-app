import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import {
  FaPlusCircle,
  FaUser,
  FaShoppingBag,
  FaEdit,
  FaLocationArrow,
  FaQuestionCircle,
  FaHome 
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import logo from "/logo.png";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <FaHome  />
        Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaCartShopping />
        Menu
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaLocationArrow />
        Orders Tracking
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaQuestionCircle />
        Customer Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  return (
    <div>
      <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-center sm:justify-start my-2">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <MdDashboardCustomize />
            </label>
            <button className="btn rounded-full px-6 bg-green text-white md:hidden flex items-center gap-2">
              <FaUser />
              Logout
            </button>
          </div>
          <div className="mt-5 md:mt-2 mx-4">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to="/dashboard" className="flex justify-start mb-3">
                <img src={logo} alt="" className="w-20" />
                <span className="badge badge-primary">Admin</span>
              </Link>
            </li>
            <hr />
            <li className="mt-3">
              <Link to="/dashboard">
                <MdDashboard />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FaShoppingBag />
                Manage Bookings
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FaPlusCircle />
                Add Menu Bookings
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FaEdit />
                Manage Items
              </Link>
            </li>
            {/* <li>
              <Link to='/dashboard'><MdDashboard />Add Menu Bookings</Link>
            </li> */}
            <li className="mb-3">
              <Link to="/dashboard/users">
                <FaUser />
                All Users
              </Link>
            </li>

            <hr />
            {/* Shared navlink */}
            {sharedLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
