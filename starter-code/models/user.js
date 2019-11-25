const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email: String,
  password: String,
  photoURL: {
    type: String,
    default: "https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png"
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;