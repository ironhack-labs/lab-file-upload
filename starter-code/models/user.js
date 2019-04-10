const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: {
    type: String,
    unique: true
  },
  email:    String,
  password: String,
  image: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
