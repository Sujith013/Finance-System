import React from "react";
import logo from "../../images/logo_1.png";
import "./NavBar.css";
import { Link } from "react-router-dom";

interface Props {}

const Navbar = (props: Props) => {
  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
          <img src={logo} alt="" />
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link to="/search" className="text-black hover:text-darkBlue">
              Search
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-6 text-back">
          <div className="hover:text-darkBlue">
            <Link to="/login" className="text-black hover:text-darkBlue">
              Login
            </Link>
          </div>
            <Link to="/signup" className="text-black hover:text-darkBlue">
              SignUp
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;