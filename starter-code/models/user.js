const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  imagePath: String,
  imageName: String,
  username: String,
  email:    String,
  password: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
