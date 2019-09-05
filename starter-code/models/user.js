const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  image: {
    type: String,
    default: "https://res.cloudinary.com/doridoro/image/upload/v1567611780/user-pictures/vsnav1gevncsolnskool.jpg"
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
