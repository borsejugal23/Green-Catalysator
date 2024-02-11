import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { handleAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(name)

  const handleLogout = () => {
    handleAuth();
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  // console.log(roles);
  return (
    <>
      <nav className="bg-cyan-100 shadow-sm p-3 flex justify-between items-center fixed w-full top-0 z-50">
        <div className="flex items-center ">
          <h1 className="text-black text-2xl mx-3">JYX SHOP</h1>
        </div>
        <div className="flex flex-wrap lg:flex-no-wrap space-x-3 text-black text-lg lg:w-3/4 justify-end ">
          <p className="cursor-pointer">Home</p>
          <p className="cursor-pointer">Menu</p>
          <p className="cursor-pointer">About</p>
        </div>

        <button
          className="text-black text-lg border border-black rounded px-2 py-1 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
      <br /><br />
      <div className="mt-2">
      <img className="w-full" alt="Blue and Brown Sale Promotion Banner" src="https://marketplace.canva.com/EAEfeN8JthU/1/0/1600w/canva-blue-and-brown-sale-promotion-banner-ghWU8YLIxYU.jpg"/>

      </div>
    </>
  );
};

export default Header;
