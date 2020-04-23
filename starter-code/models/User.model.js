const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  photoURL: String,
  username: String,
  email: String,
  password: String
});

module.exports = model('User', UserSchema);
