const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  photo:{
    path: String,
    originalname:String
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;