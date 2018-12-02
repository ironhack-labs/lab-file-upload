const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = Schema({
  username: String,
  email:    String,
  password: String,
  imgPath: String
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
