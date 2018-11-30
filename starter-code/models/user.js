const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: String,
  email:    String,
  photoURL:String,
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
module.exports = mongoose.model('User', userSchema);
