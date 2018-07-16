const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  profilePic: { type: String, default: "../public/images/tumblrdefault.png" },

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
