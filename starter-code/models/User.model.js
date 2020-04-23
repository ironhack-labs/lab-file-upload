const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  profileImg: String
}, {
  timestamps: true
});

module.exports = model('User', UserSchema);
