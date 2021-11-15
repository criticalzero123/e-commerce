const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();

const User = require("../models/userModel");

router.post("/register", (req, res) => {
  User.find(
    {
      $or: [
        { email: req.body.email },
        { mobile_number: req.body.mobileNumber },
        { username: req.body.username },
      ],
    },
    (err, docs) => {
      if (docs.length > 0) {
        return res
          .status(400)
          .json({ message: "Account is already registered" });
      } else {
        const newuser = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          birth_date: req.body.birth_date,
          email: req.body.email,
          password: req.body.password,
          gender: req.body.gender,
          username: req.body.username,
          mobile_number: req.body.mobile_number,
        });

        newuser.save((err) => {
          if (!err) {
            res.send("User Registeration Successful");
          } else {
            res.send("Something Went Wrong");
          }
        });
      }

      if (err) {
        return res.status(400).json({ message: "Something went Wrong" });
      }
    }
  );
});

router.post("/login", (req, res) => {
  User.find(
    {
      $and: [
        {
          $or: [
            { email: req.body.username },
            { mobile_number: req.body.username },
            { username: req.body.username },
          ],
        },
        { password: req.body.password },
      ],
    },
    (err, docs) => {
      if (docs.length > 0) {
        const user = {
          first_name: docs[0].first_name,
          last_name: docs[0].last_name,
          _id: docs[0]._id,
          email: docs[0].email,
          username: docs[0].username,
          mobile_number: docs[0].mobile_number,
        };

        res.send(user);
      } else {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    }
  );
});

module.exports = router;
