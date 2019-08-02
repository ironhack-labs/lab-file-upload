const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//esquema de usuario para registro

const UserSchema = Schema({
  username: String,
  email: String,
  password: String,
  ingName: String,
  imgPath: String
});


const User = mongoose.model("User", UserSchema);

module.exports = User;
