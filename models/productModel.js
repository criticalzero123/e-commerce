const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    require: true,
  },
  comment: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
});

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    imageUrl: {
      type: [String],
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    subCategory: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    colors: {
      type: [String],
      require: true,
    },
    countInStock: {
      type: [{ color: String, stock: Number }],
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    reviews: [reviewSchema],
  },
  {
    timeStamps: true,
  }
);

const Product = mongoose.model("products", productSchema);

module.exports = Product;
