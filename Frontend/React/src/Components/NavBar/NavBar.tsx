import React from "react";
import logo from "../../images/logo_1.png";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

interface Props {}

const Navbar = (props: Props) => {
  const {isLoggedIn,user,logout} = useAuth();

  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
          <img src={logo} alt="" width={40}/>
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link to="/search" className="text-black hover:text-darkBlue">
              Search
            </Link>
          </div>
        </div>
        {isLoggedIn() ? (        <div className="hidden lg:flex items-center space-x-6 text-black font-bold">
          <div className="hover:text-darkBlue">
            Welcome, {user?.username}
          </div>
          <div className="hover:text-darkBlue">
            <a onClick={logout}>
              Logout
            </a>
          </div>
        </div>) : (        <div className="hidden lg:flex items-center space-x-6 text-black font-bold">
          <div className="hover:text-darkBlue">
            <Link to="/login" className="text-black hover:text-darkBlue">
              Login
            </Link>
          </div>
          <div className="hover:text-darkBlue">
            <Link to="/signup" className="text-black hover:text-darkBlue">
              SignUp
            </Link>
          </div>
        </div>)}
      </div>
    </nav>
  );
};

export default Navbar;