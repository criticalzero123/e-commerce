const express = require("express");

const router = express.Router();
const Product = require("../models/productModel");

router.get("/getallproducts", (req, res) => {
  Product.find({}, (err, docs) => {
    if (!err) {
      return res.send(docs);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
});

router.post("/getallcategoryproducts", (req, res) => {
  Product.find({ category: req.body.category }, (err, docs) => {
    if (!err) {
      return res.send(docs);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  }).sort({ subCategory: 1 });
});

router.post("/getallsubcategoryproducts", (req, res) => {
  Product.find(
    {
      $and: [
        { category: req.body.category },
        { subCategory: req.body.subCategory },
      ],
    },
    (err, docs) => {
      if (!err) {
        return res.send(docs);
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    }
  );
});

router.post("/getproductbyid", (req, res) => {
  Product.find({ _id: req.body.productId }, (err, docs) => {
    if (!err) {
      res.send(docs[0]);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
});

router.post("/addreview", async (req, res) => {
  const { review, productid, currentUser } = req.body;

  const product = await Product.findById({ _id: productid });

  const reviewmodel = {
    name: currentUser.username,
    userid: currentUser._id,
    rating: review.rating,
    comment: review.comment,
  };

  product.reviews.push(reviewmodel);

  var rating =
    product.reviews.reduce((acc, x) => acc + x.rating, 0) /
    product.reviews.length;

  // When updating a field in mongo db
  product.rating = rating;

  product.save((err) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      res.send("Review submitted successfully");
    }
  });
});

module.exports = router;
