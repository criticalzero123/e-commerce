const mongoose = require("mongoose");

var mongoDBURL =
  "mongodb+srv://e-commerce:e-commerce@cluster0.tx3hl.mongodb.net/int-prog";

mongoose.connect(mongoDBURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

var dbconnect = mongoose.connection;

dbconnect.on("error", () => {
  console.log("Mongo DB Connection Failed");
});

dbconnect.on("connected", () => {
  console.log("Mongo DB Connection Successfull");
});

module.exports = mongoose;
