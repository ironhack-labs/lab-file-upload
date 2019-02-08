const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = Schema({
  username: String,
  email: String,
  password: String,
  imgPath: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
