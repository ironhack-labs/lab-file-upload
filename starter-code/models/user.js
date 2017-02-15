const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Picture = require("./picture");

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  img:  Object
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
