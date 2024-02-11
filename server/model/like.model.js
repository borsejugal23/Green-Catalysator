
const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  liked: {
    type: Boolean,
    required: true,
  },
});

const Like = mongoose.model('Like', likeSchema);

module.exports = {Like};