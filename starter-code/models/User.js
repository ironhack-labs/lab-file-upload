const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
let passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
  username: String,
  email:    String,
  password: String,
  profilePic: {
    type:String,
    default: "https://success.salesforce.com/resource/1550016571000/tdxlib/img/default-user.png"
  }
});
userSchema.plugin(passportLocalMongoose, {usernameField:"email"})
const User = mongoose.model('User', userSchema);
module.exports = User;
