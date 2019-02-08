const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  photoPath: String,

});

module.exports = mongoose.model('User', UserSchema);
