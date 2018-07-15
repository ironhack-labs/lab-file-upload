const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const pictureSchema = new Schema({
  name: String,
  path: String,
  originalName: String
});

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  avatar: pictureSchema
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
