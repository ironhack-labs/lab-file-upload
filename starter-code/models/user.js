const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String, 
  photoName: String,
  photoUrl: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
