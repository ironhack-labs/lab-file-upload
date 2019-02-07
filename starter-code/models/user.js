const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  image: String
});

module.exports = mongoose.model('user', UserSchema);
