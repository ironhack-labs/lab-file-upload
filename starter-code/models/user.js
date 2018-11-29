const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = Schema({
  username: String,
  email:    String,
  photoURL:String,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });
module.exports = mongoose.model('User', UserSchema);
