// ProductList.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../Redux/ProductList/action";
import { Spinner } from "@chakra-ui/react";
import { ProductCard } from "./ProductCard";

// ProductList Component
const ProductList = () => {
  // State for categories and selected category
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Redux dispatch and selector to manage product data
  const dispatch = useDispatch();
  const { isLoading, isError, data } = useSelector(
    (store) => store.productReducer
  );

  // Fetch initial product data and categories on component mount
  useEffect(() => {
    dispatch(fetchProductData(""));

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle category selection change
  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);

    // Fetch product data based on selected category
    dispatch(fetchProductData({ category: selectedValue }));
  };

  // Render the ProductList component
  return (
    <>
      <div className="w-full flex justify-between  p-4">
        {/* Category selection dropdown */}
        <select
          id="categorySelect"
          className="w-full md:w-2/5 lg:w-1/5 xl:w-1/5  p-2 mx-4 mt-1 border border-black rounded-md"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {categories?.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
            </option>
          ))}
        </select>
      </div>

      {/* Render product cards based on loading and error states */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen mt-[-10%] ">
          {/* Display loading spinner */}
          <Spinner
            thickness="2px"
            speed="0.600s"
            emptyColor="gray.200"
            color="black.500"
            size="xl"
          />
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center text-center">
          {/* Display error message and image */}
          <img
            src="https://students.masaischool.com/static/media/assignment-article.306c336bf8778468914b433407306985.svg"
            alt="Data not found"
            className="w-1/4 md:w-1/3 lg:w-1/6"
          />
          <h1 className="text-xl md:text-xl lg:text-2xl">Data not found</h1>
        </div>
      ) : (
        // Display product cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-0 p-8">
          {data?.map((item) => (
            <ProductCard key={item.id} data={item} />
          ))}
        </div>
      )}
    </>
  );
};

// Export the ProductList component
export default ProductList;
