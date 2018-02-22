const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  profilePic: Object
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
