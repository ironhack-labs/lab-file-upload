const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const PLM = require('passport-local-mongoose')

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  photoURL:String
});

UserSchema.plugin(PLM,{usernameField:'username'})
const User = mongoose.model('User', UserSchema);
module.exports = User;
