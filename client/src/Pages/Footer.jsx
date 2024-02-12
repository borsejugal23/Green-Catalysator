import React from "react";

const Footer = () => {
  return (
    <>
      <br />
      <br />
      <footer className="bg-gray-800 text-white py-4  w-full">
        <div className="container mx-auto text-center">
          <p className="text-md">
            &copy; {new Date().getFullYear()} GREEN CATALYSATOR IT AB. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;