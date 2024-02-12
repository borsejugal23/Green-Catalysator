const express = require("express");

require("dotenv").config();
// const { userModel } = require("../model/user.model");
const { Like } = require("../model/like.model");

const likeRoute = express.Router();

// const axios= require("axios")

likeRoute.post("/:productId/:userId", async (req, res) => {
  const { productId, userId } = req.params;
  const { liked } = req.body;
  console.log(productId, userId);

  const newLike = await Like.updateOne(
    { productId, userId },
    { $set: { liked } },
    { upsert: true }
  );
  console.log(newLike);

  return res.status(201).json({
    message: "success",
    product: newLike,
  });
});

likeRoute.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);

    let likesAggregation = await Like.aggregate([
      {
        $group: {
          _id: "$productId",
          totalLikes: {
            $sum: {
              $cond: [{ $eq: ["$liked", true] }, 1, 0],
            },
          },
          totalDislikes: {
            $sum: {
              $cond: [{ $eq: ["$liked", false] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          totalLikes: 1,
          totalDislikes: 1,
        },
      },
    ]);

    const userAllLikes = await Like.find({ userId: userId });

    // console.log(likesAggregation);
    const allLikes = likesAggregation.map((likedData) => {
      //0

      const userLiked = userAllLikes.find(
        (like) => like.productId === likedData.productId
      );

      return userLiked
        ? { ...likedData, liked: userLiked.liked }
        : { ...likedData, liked: false };
    });

    res.status(200).send({ allLikes: allLikes });
  } catch (error) {
    console.log("error In likes : ", error.message);
    res.status(500).send({ message: "error in fetching the Likes" });
  }
});

console.log("    ==========================================================================   "
);


module.exports = { likeRoute };
