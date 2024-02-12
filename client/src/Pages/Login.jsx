// LoginForm.js

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { login } from "../Redux/AuthReducer/action";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// LoginForm Component
const LoginForm = () => {
  // Initializing necessary hooks
  const toast = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for handling form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Redux dispatch for authentication actions
  const dispatch = useDispatch();
  const { toggle } = useContext(AuthContext);

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    dispatch(login({ formData: formData, callback: handelcallback }));
  };

  // Callback function after authentication action
  const handelcallback = (data) => {
    console.log(data);
    setIsSubmitting(false);
    if (data.token) {
      // Display success message if authentication is successful
      toast({
        position: "top",
        title: `${data?.msg}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Redirect to the product page on success
      return navigate("/product");
    } else {
      // Display error message if authentication fails
      toast({
        position: "top",
        title: `${data?.msg}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Function to toggle between login and signup forms
  const handleToggle = () => {
    toggle();
  };

  // Render the LoginForm component
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Login to Your Account
      </h2>
      <p className="mb-6 text-center">
        Don't have an account?{" "}
        <strong onClick={handleToggle} className="cursor-pointer text-blue-600">
          Sign Up
        </strong>
      </p>

      {/* Login form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-md font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-md font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className={`${
            isSubmitting ? "bg-blue-300" : "bg-blue-500"
          } text-white p-2 rounded-md w-full ${
            isSubmitting ? "cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

// Export the LoginForm component
export default LoginForm;
