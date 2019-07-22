const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email: String,
  password: String,
  imgName: {
    type: String,
    default: "Name"
  },
  imgPath: {
    type: String,
    default: "http://i.imgur.com/AItCxSs.jpg"
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
