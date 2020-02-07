const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const model = mongoose.model

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  photoURL: {
    type: String,
    default: ''
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = model('User', UserSchema);
