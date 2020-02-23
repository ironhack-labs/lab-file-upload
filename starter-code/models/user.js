const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  photoName: String,
  photoURL: {
    type: String,
    default: 'https://img-9gag-fun.9cache.com/photo/aBgj0r1_460swp.webp'
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
