const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  path: String,
  imageName: String,
});

module.exports = model('User', UserSchema);
