const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  profilePic: String
});

module.exports = model('User', UserSchema);
