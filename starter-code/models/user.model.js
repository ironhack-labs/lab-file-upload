const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  imgName: String,
  imgPath: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
