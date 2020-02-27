const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  photoName: String,
  photoURL: {
    type: String,
    default: 'https://i.dlpng.com/static/png/1647142-profilepng-512512-profile-png-512_512_preview.png'
  }
});

module.exports = model('User', UserSchema);
