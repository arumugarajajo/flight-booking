import React from "react";
import "./Navbar.css";
import { MdCardTravel } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";

function Navbar() {
  return (
    <div className="navbar">
      <div className="leftNavbar">
        <h1>Airline</h1>
      </div>
      <div className="rightNavbar">
        <MdCardTravel className="icon" />
        <div className="profile">
          <span id="mytrip">My Trips</span>
          <span id="manageBooking">Manage Booking</span>
        </div>
        <button className="loginSignup-btn">
          <span>
            <FaCircleUser className="icon" />
          </span>
          <span id="loginSignup">Login/Signup</span>
          <span>
            <FaAngleDown className="icon" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
