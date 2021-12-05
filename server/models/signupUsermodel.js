//making a mongoose schema
//collection designing
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  otp: {
    type: String,
    default: Date.now,
    expires: 60,
  }

});

const User = mongoose.model("User", UserSchema);
module.exports = User;