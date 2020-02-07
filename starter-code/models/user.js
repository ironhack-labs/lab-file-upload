const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  photoName: String,
  photoURL: {
    type: String,
    default: 'https://i.dlpng.com/static/png/1647142-profilepng-512512-profile-png-512_512_preview.png'
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
