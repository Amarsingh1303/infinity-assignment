const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema({
  user_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("User", user);
