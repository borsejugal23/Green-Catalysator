// SignUpForm.js

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { signup } from "../Redux/AuthReducer/action";
import { useToast } from "@chakra-ui/react";

// SignUpForm Component
const SignUpForm = () => {
  // Initializing necessary hooks
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redux dispatch for authentication actions
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Context to toggle between login and signup forms
  const { toggle } = useContext(AuthContext);

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    dispatch(signup({ formData: formData, callback: handelcallback }));
  };

  // Callback function after signup action
  const handelcallback = (data) => {
    setIsSubmitting(false);
    if (data.msg === "Registered successfully") {
      // Display success message if signup is successful
      toast({
        position: "top",
        title: `${data?.msg}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Display error message if signup fails
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

  // Render the SignUpForm component
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Create Your Account
      </h2>
      <p className="mb-2 text-center">
        Have an account?{" "}
        <strong onClick={handleToggle} className="cursor-pointer text-blue-600">
          Log in now
        </strong>
      </p>
      {/* Signup form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="text-md font-medium text-gray-600 mb-1 px-0"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
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
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

// Export the SignUpForm component
export default SignUpForm;
