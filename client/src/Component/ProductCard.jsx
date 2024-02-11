import { useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Modal from "./Modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const ProductCard = ({ data }) => {
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
  } = data;
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const userId = JSON.parse(localStorage.getItem("userId"));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLike = async (productId, like) => {
    setLike((p) => !p);
    if (dislike) {
      setDislike(false);
    }
    console.log(productId, userId);
    // return

    await fetch(
      `${process.env.REACT_APP_API_URL}/likes/${productId}/${userId}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ liked: like }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log("REsult :::", result);
      })
      .catch((err) => {
        console.error("Error In Like : ", err);
      });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const originalPrice = price / ((100 - discountPercentage) / 100);
  // console.log(images);
  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-md leading-loose     transition-transform transform hover:scale-105 font-sans">
        {/* modal will open when click on Image */}
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

        {/* like dislike features */}

        <div className="flex mt-2 space-x-3 ">
          <button onClick={() => handleLike(id, true)} className="">
            {like ? (
              <ThumbUpAltIcon
                className={`${like ? "text-red-600" : "text-black"}`}
              />
            ) : (
              <ThumbUpOffAltIcon
                className={`${like ? "text-red-600" : "text-black"}`}
              />
            )}
          </button>

          <button onClick={() => handleLike(id, false)} className="">
            {dislike ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
          </button>
        </div>
      </div>

      {/* modal to show product details */}
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        {/* flex wrap for image array and description part */}
        <div className="max-w-3xl mx-auto flex flex-wrap">
          {/* slider for image array */}
          {images.length > 1 ? (
            <div className="w-full md:w-1/2 mb-4">
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
            <div className="w-full md:w-1/2 mb-4">
              <img
                src={images[0]}
                alt={`Product 1`}
                className="w-full h-72 object-cover rounded shadow-md hover:transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          {/* description of product */}
          <div className="w-full md:w-1/2 px-6 py-4">
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
