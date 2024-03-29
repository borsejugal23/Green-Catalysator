// ProductCard.js

import { useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Modal from "./Modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { handleLike_Dislike } from "../Redux/ProductList/action";
import { useDispatch } from "react-redux";

// ProductCard Component
export const ProductCard = ({ data ,categories}) => {
  // Destructuring data
  console.log("productcard",categories)
  const {
    id,
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
    liked,
    totalLikes,
    totalDislikes,
    
  } = data;

  // State for dislike, modal, and userId
  const [dislike, setDislike] = useState(false);
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Redux dispatch for like/dislike action
  const dispatch = useDispatch();

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle like/dislike
  const handleLike = async (productId, like) => {
    dispatch(handleLike_Dislike({ productId, like, userId ,categories }));
  };


  // Slider settings for multiple images
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Calculate original price with discount
  const originalPrice = price / ((100 - discountPercentage) / 100);

  // Render the ProductCard component
  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-md leading-loose transition-transform transform hover:scale-105 font-sans">
        {/* Modal will open when clicking on the Image */}
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-64 rounded object-cover cursor-pointer"
          onClick={openModal}
        />
        <h1 className="text-center mt-2 text-lg text-black font-semibold">
          {title}
        </h1>
        <p className="text-gray-600">Brand: {brand}</p>

        <div className="flex mt-2 space-x-3">
          <p className="text-base font-medium text-gray-700">{price} SEK</p>
          <p className="line-through text-base text-gray-500">
            {originalPrice.toFixed(2)} SEK
          </p>
          <p className="text-green-600 font-medium text-base">
            {discountPercentage}% off
          </p>
        </div>

        {/* Like/Dislike features */}
        <div className="flex mt-2 space-x-3 ">
          <button onClick={() => handleLike(id, true)} className="">
            {liked ? (
              <ThumbUpAltIcon className={"text-green-600"} />
            ) : (
              <ThumbUpOffAltIcon className="text-black" />
            )}
          </button>
          <span>{totalLikes}</span>

          <button onClick={() => handleLike(id, false)} className="">
            {dislike ? (
              <ThumbDownAltIcon className="text-red-600" />
            ) : (
              <ThumbDownOffAltIcon className="text-black" />
            )}
          </button>
          <span>{totalDislikes}</span>
        </div>
      </div>

      {/* Modal to show product details */}
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        {/* Flex wrap for image array and description part */}
        <div className="max-w-3xl mx-auto flex flex-wrap">
          {/* Slider for image array */}
          {images.length > 1 ? (
            <div className="w-full md:w-1/2 mb-4 pr-4">
              <Slider {...settings} className="w-full">
                {images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-72 object-cover rounded shadow-md hover:transform hover:scale-125 transition-transform duration-300"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className="w-full md:w-1/2 mb-4 pr-4">
              <img
                src={images[0]}
                alt={`Product 1`}
                className="w-full h-72 object-cover rounded shadow-md hover:transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          {/* Description of product */}
          <div className="w-full md:w-1/2 px-3 py-4">
            <div className="font-bold text-2xl mb-4">{title}</div>
            <p className="text-gray-700 text-base mb-4">{description}</p>
            <div className="flex mt-2 space-x-3">
              <p className="text-xl font-medium text-gray-700">{price} SEK</p>
              <p className="line-through text-base text-gray-500">
                {originalPrice.toFixed(2)} SEK
              </p>
              <p className="text-green-600 font-medium text-base">
                {discountPercentage}% off
              </p>
            </div>
            <div className="flex mb-4 mt-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {category}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {brand}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-gray-700 mr-2">Rating:</span>
              <span>{rating}</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-700">
                Available in stock: {stock} Qty
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
