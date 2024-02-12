// Authentication.js

import React, { useContext } from "react";
import LoginForm from "../Pages/Login";
import SignUpForm from "../Pages/Signup";
import { AuthContext } from "../context/AuthContext";

const Authentication = () => {
  const { swap } = useContext(AuthContext);

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen">
      <div className=" md:w-1/2 overflow-hidden relative border">
      <img
          src="https://plus.unsplash.com/premium_photo-1681487865280-c2b836dd83e8?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login"
          className="w-full h-full object-cover"
        />
        {/* <img className="w-full h-full object-contain" alt="Green Minimalist Summer Big Sale Medium Banner" src="https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/> */}

        <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-30 text-white p-4 text-center z-0 md:text-lg lg:text-xl xl:text-2xl">
          Elevate your brand with our seamless online shopping solution.
        </p>
      </div>
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          {swap ? <SignUpForm /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
