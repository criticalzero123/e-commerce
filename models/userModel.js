const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      require,
    },
    last_name: {
      type: String,
      require,
    },
    birth_date: {
      type: String,
      require,
    },
    gender: {
      type: String,
      require,
    },
    email: {
      type: String,
      require,
    },
    password: {
      type: String,
      require,
    },
    mobile_number: {
      type: String,
      require,
    },
    username: {
      type: String,
      require,
    },
  },
  { timestaps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
