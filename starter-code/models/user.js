const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  image: {
    path: String,
    name: String
  },
  password: String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
