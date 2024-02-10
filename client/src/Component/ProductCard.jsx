import { useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
export const ProductCard = ({ data }) => {
  const {
    //   id,
    title,
    //   description,
    price,
    discountPercentage,
    // rating,
    //   stock,
    brand,
    //   category,
    thumbnail,
  } = data;
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const handleLike = () => {
    setLike((p) => !p);
    if (dislike) {
      setDislike(false);
    }
  };
  const handleDislike = () => {
    setDislike((p) => !p);
    if (like) {
      setLike(false);
    }
  };
  const originalPrice = price / ((100 - discountPercentage) / 100);
  return (
    <div className="bg-white p-4 rounded-md shadow-md leading-loose     transition-transform transform hover:scale-105 font-sans">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-64 rounded object-cover cursor-pointer"
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

      <div className="flex mt-2 space-x-3">
        <button
          onClick={handleLike}
          className="transition-transform transform hover:scale-110 focus:outline-none"
        >
          {like ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
        </button>
        <button
          onClick={handleDislike}
          className="transition-transform transform hover:scale-110 focus:outline-none"
        >
          {dislike ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
        </button>
      </div>
    </div>
  );
};
