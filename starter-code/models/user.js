const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email: String,
  password: String,
  picturePath: String,
  profilePicture: String,
  posts: []
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
