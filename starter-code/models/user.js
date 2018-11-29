const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  photoURL:String,
});

module.exports = mongoose.model('User', UserSchema);;
