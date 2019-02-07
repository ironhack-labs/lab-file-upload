const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  picPath: {
    type: String,
    default: "/uploads/default.jpg",
    required: false
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
