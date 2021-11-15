const { v4: uuidv4 } = require("uuid");
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51H4nyJL4yJIlpmX8kwdhI8dF5RJSezvMwVWf39etlRpvEKuHk1SBL0Cjd31B4M7CpbixJmZgFyWI1CpFNvv4ta9p00ZXQcfPGy"
);

const Order = require("../models/orderModel");
const Product = require("../models/productModel");

router.post("/placeorder", async (req, res) => {
  const { token, cartItems, currentUser, subTotal } = req.body;
  const customer = await stripe.customers.create({
    email: token.email,
    name: token.card.name,
    shipping: {
      address: {
        city: token.card.address_city,
        country: token.card.address_country,
        line1: token.card.address_line1,
        postal_code: token.card.address_zip,
      },

      name: token.card.name,
    },
    source: token._id,
  });

  const paymentMethods = await stripe.paymentMethods.create({
    type: "card",
    card: {
      number: "4242424242424242",
      exp_month: token.card.exp_month,
      exp_year: token.card.exp_year,
      cvc: "123",
    },
  });

  const payment = await stripe.paymentIntents.create(
    {
      amount: subTotal * 100,
      currency: "php",
      customer: customer.id,
      receipt_email: token.email,
      payment_method: paymentMethods.id,
      payment_method_types: ["card"],
      confirmation_method: "manual",
      confirm: true,
      shipping: customer.shipping,
    },
    {
      idempotencyKey: uuidv4(),
    }
  );

  if (payment) {
    const order = new Order({
      userId: currentUser._id,
      name: currentUser.first_name + " " + currentUser.last_name,
      email: currentUser.email,
      orderItems: cartItems,
      shippingAddress: {
        address: token.card.address_line1,
        city: token.card.address_city,
        country: token.card.address_country,
        postalCode: token.card.address_zip,
      },
      orderAmount: subTotal,
      transactionId: paymentMethods.id,
      isDelivered: false,
    });

    for (let i = 0; i < cartItems.length; i++) {
      const product = await Product.findById({ _id: cartItems[i]._id });

      for (let j = 0; j < product.countInStock.length; j++) {
        if (product.countInStock[j].color === cartItems[i].color) {
          product.countInStock[j].stock =
            product.countInStock[j].stock - cartItems[i].quantity;
          product.save();
        }
      }
    }

    order.save((err, doc) => {
      if (err) {
        return res.status(400).json({ message: err });
      } else {
        res.send(doc);
      }
    });
  } else {
    res.status(400).json({ message: "Payment Failed" });
  }
});

router.post("/getordersbyuserid", (req, res) => {
  const userid = req.body.userid;

  Order.find({ userId: userid }, (err, docs) => {
    if (err) {
      return res.status(400).json({ message: "Something went wrong" });
    } else {
      res.send(docs);
    }
  });
});

router.post("/getorderbyid", (req, res) => {
  const orderid = req.body.orderid;

  Order.find({ _id: orderid }, (err, docs) => {
    if (err) {
      return res.status(400).json({ message: "Something went wrong" });
    } else {
      res.send(docs[0]);
    }
  });
});

module.exports = router;
